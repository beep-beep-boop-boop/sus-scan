export const dynamic = "force-dynamic";
export const revalidate = 0;

import { db } from "../../../../../lib/database/db";
import { CategoryResponse } from "../../category/route";
import { categories, products } from "../../../../../lib/database/schema";
import { eq } from "drizzle-orm";

export async function GET(_request: Request) {
  const oldestCategories = await db.query.categories.findMany({
    orderBy: (categories, { asc }) => [asc(categories.lastCrawledAt)],
    where: (categories, { or, isNull, lt }) =>
      or(
        isNull(categories.lastCrawledAt),
        lt(
          categories.lastCrawledAt,
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
      ),
    limit: 2,
  });

  await Promise.all(
    oldestCategories.map(async (category) => {
      const requestURL = new URL("/api/scrape/category", process.env.BASE_URL);
      requestURL.searchParams.set("url", category.normalizedUrl);

      console.log(`Fetching category data for category: ${category.id}`);

      const categoryDataResponse = await fetch(requestURL);

      if (!categoryDataResponse.ok) {
        throw new Error(
          `Failed to fetch category data for category: ${category.id}`
        );
      }

      const categoryData =
        (await categoryDataResponse.json()) as CategoryResponse;

      await db.transaction(async (tx) => {
        await tx
          .update(categories)
          .set({ lastCrawledAt: new Date() })
          .where(eq(categories.id, category.id));

        await tx
          .insert(products)
          .values(
            categoryData.products.map((url) => ({
              greenSealURL: url,
              category: category.id,
            }))
          )
          .onConflictDoNothing();
      });
    })
  );

  return new Response("Success", {
    status: 200,
  });
}
