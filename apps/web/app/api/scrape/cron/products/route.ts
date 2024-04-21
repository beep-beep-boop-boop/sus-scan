export const dynamic = "force-dynamic";

import { db } from "../../../../../lib/database/db";
import { ProductResponse } from "../../product/route";
import { products } from "../../../../../lib/database/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const oldestProducts = await db.query.products.findMany({
    orderBy: (products, { asc }) => [asc(products.lastCrawledAt)],
    where: (products, { or, isNull, lt }) =>
      or(
        isNull(products.lastCrawledAt),
        lt(
          products.lastCrawledAt,
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
      ),
    limit: 15,
  });

  await Promise.all(
    oldestProducts.map(async (product) => {
      const requestURL = new URL("/api/scrape/product", process.env.BASE_URL);
      requestURL.searchParams.set("url", product.greenSealURL);

      console.log(`Fetching product data for product: ${product.id}`);

      const productDataResponse = await fetch(requestURL);

      if (!productDataResponse.ok) {
        throw new Error(
          `Failed to fetch product data for category: ${product.id}`
        );
      }

      const {
        name,
        description,
        certifiedSince,
        company,
        companyURL,
        brand,
        upc,
      } = (await productDataResponse.json()) as ProductResponse;

      await db
        .update(products)
        .set({
          name,
          description,
          certifiedSince: Number(certifiedSince),
          companyName: company,
          companyLink: companyURL,
          brand,
          upc,
          lastCrawledAt: new Date(),
        })
        .where(eq(products.id, product.id));
    })
  );

  return new Response("Success", {
    status: 200,
  });
}
