export const dynamic = "force-dynamic";
export const revalidate = 0;

import { createClient } from "@supabase/supabase-js";
import { db } from "../../../../../lib/database/db";
import { ProductResponse } from "../../product/route";
import { products } from "../../../../../lib/database/schema";
import { eq } from "drizzle-orm";

const supabase = createClient("https://vybpwdkgtozisxgilhuv.supabase.co");

export async function GET(_request: Request) {
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
        imageURL,
      } = (await productDataResponse.json()) as ProductResponse;

      const imageResponse = await fetch(imageURL);
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image for product: ${product.id}`);
      }
      const imageBuffer = await imageResponse.arrayBuffer();
      const imageName = `${product.id}.jpg`; // or any desired image name
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(imageName, imageBuffer);
      if (error) {
        throw new Error(`Failed to upload image for product: ${product.id}`);
      }

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
          imageUrl: supabase.storage
            .from("product-images")
            .getPublicUrl(imageName).data.publicUrl,
        })
        .where(eq(products.id, product.id));
    })
  );

  return new Response("Success", {
    status: 200,
  });
}
