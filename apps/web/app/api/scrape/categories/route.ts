// returns product information for a given green seal product
export const dynamic = "force-dynamic";

import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import normalizeUrl from "normalize-url";

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

  const categories = categoryUrls.map((url) => {
    return {
      name: "",
      group: "",
      normalizedUrl: normalizeUrl(
        new URL(url, "https://certified.greenseal.org").toString()
      ),
    };
  });

  return NextResponse.json(
    {
      categories,
    },
    {
      status: 200,
    }
  );
}
