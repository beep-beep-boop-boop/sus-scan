// returns product information for a given green seal product
export const dynamic = "force-dynamic";
export const revalidate = 0;

import * as cheerio from "cheerio";
import { type NextRequest, NextResponse } from "next/server";
import normalizeUrl from "normalize-url";

export async function GET(request: NextRequest) {
  // grab green seal url from request
  const searchParams = request.nextUrl.searchParams;
  const greenSealCategoryURL = searchParams.get("url");

  if (!greenSealCategoryURL) {
    return new Response("Missing URL", {
      status: 400,
    });
  }

  const products: string[] = [];
  let hasNextPage = true;

  const greenSealCategoryURLObject = new URL(greenSealCategoryURL);
  greenSealCategoryURLObject.searchParams.set("limit", "80");
  greenSealCategoryURLObject.searchParams.set("offset", "0");
  greenSealCategoryURLObject.searchParams.set("filters[letter_start]", "0");
  greenSealCategoryURLObject.searchParams.set("filters[letter_end]", "0");

  while (hasNextPage) {
    hasNextPage = false;

    // load HTML from product page
    const response = await fetch(greenSealCategoryURLObject);
    if (response.status != 200) {
      return new Response("Could not load categroy", {
        status: 400,
      });
    }

    const html = await response.text();

    const $ = cheerio.load(html);
    $('a[href*="/product/"]').each((index, element) => {
      const href = $(element).attr("href");
      if (href) {
        products.push(normalizeUrl(href));
      }
    });

    const pagination = $(".pagination").text();
    const paginationMatch = pagination.match(
      /Page (?<currentPage>\d+) of (?<totalPages>\d+)/
    );
    if (
      paginationMatch?.groups?.currentPage &&
      paginationMatch?.groups?.totalPages
    ) {
      const { currentPage, totalPages } = paginationMatch.groups;
      if (parseInt(currentPage) < parseInt(totalPages)) {
        hasNextPage = true;
        greenSealCategoryURLObject.searchParams.set(
          "offset",
          (parseInt(currentPage) * 80).toString()
        );
      }
    }
  }

  return NextResponse.json(
    { products: [...new Set(products)] },
    {
      status: 200,
    }
  );
}

export type CategoryResponse = {
  products: string[];
};
