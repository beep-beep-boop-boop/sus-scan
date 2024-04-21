// returns product information for a given green seal product
export const dynamic = "force-dynamic";

import * as cheerio from "cheerio";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import normalizeUrl from "normalize-url";
import { db } from "../../../../lib/database/db";
import { categories } from "../../../../lib/database/schema";

export async function GET() {
  const response = await fetch("https://certified.greenseal.org/directory");
  if (response.status != 200) {
    return new Response("Could not load directory", {
      status: 500,
    });
  }

  const html = await response.text();

  // parse with cheerio
  const $ = cheerio.load(html);

  const categoryUrls: string[] = [];
  $(
    '#app > header > div.site-main > div > div > nav > ul > li:nth-child(1) > ul a[href*="/products/"]'
  ).each((index, element) => {
    const href = $(element).attr("href");
    if (href) {
      categoryUrls.push(href);
    }
  });

  const categoriesNormalized = categoryUrls.map((url) => {
    const groups = url.match(/\/products\/(?<group>.+)\/(?<name>.+)/)?.groups;

    if (!groups?.group || !groups?.name) {
      throw new Error(`Could not parse group or name for URL: ${url}`);
    }

    return {
      name: decodeURIComponent(groups.name).replaceAll("+", " "),
      group:
        decodeURIComponent(groups.group).replaceAll("+", " ") === "Product"
          ? null
          : decodeURIComponent(groups.group).replaceAll("+", " "),
      normalizedUrl: normalizeUrl(
        new URL(url, "https://certified.greenseal.org").toString()
      ),
    };
  });

  await db
    .insert(categories)
    .values(categoriesNormalized)
    .onConflictDoUpdate({
      target: categories.normalizedUrl,
      set: {
        name: sql.raw(`excluded.${categories.name.name}`),
        group: sql.raw(`excluded.${categories.group.name}`),
      },
    });

  return NextResponse.json(
    {
      categories: categoriesNormalized,
    },
    {
      status: 200,
    }
  );
}
