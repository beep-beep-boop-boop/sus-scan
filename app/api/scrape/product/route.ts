// returns product information for a given green seal product
export const dynamic = "force-dynamic";
export const revalidate = 0;

import * as cheerio from "cheerio";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // grab green seal url from request
  const searchParams = request.nextUrl.searchParams;
  const greenSealProductsURL = searchParams.get("url");

  if (!greenSealProductsURL) {
    return new Response("Missing URL", {
      status: 400,
    });
  }

  // load HTML from product page
  const response = await fetch(greenSealProductsURL);
  if (response.status != 200) {
    return new Response("Product not found", {
      status: 400,
    });
  }

  const html = await response.text();

  // parse with cheerio
  const $ = cheerio.load(html);
  const detailsHTML = $(
    "#app > main > div > div:nth-child(3) > div > div > div.col"
  ).html();

  if (!detailsHTML) {
    return new Response("Couldn't find details", {
      status: 500,
    });
  }

  const name = $(
    "#app > main > div > div:nth-child(3) > div > p:nth-child(1)"
  ).text();
  const description = $(
    "#app > main > div > div:nth-child(3) > div > p:nth-child(3)"
  ).text();
  const certifiedSince = detailsHTML
    .match(/<div>Certified Since:.*?(?<year>\d{4})<\/div>/s)
    ?.groups?.year?.trim();
  const brand = detailsHTML
    .match(/<div>Brand:.*?(?<brand>.+?)<\/div>/s)
    ?.groups?.brand?.trim();
  const companyGroups = detailsHTML.match(
    /<div>Company:.*?href="(?<href>.+?)".*?>(?<name>.+?)<\/a>.*?<\/div>/s
  )?.groups;
  const company = companyGroups?.name;
  const companyURL = companyGroups?.href;
  const upc = detailsHTML
    .match(/<div>UPC:.*?(?<upc>.+?)<\/div>/s)
    ?.groups?.upc?.trim();

  return NextResponse.json(
    {
      name,
      description,
      certifiedSince,
      company,
      companyURL,
      brand,
      upc,
    },
    {
      status: 200,
    }
  );
}

export type ProductResponse = {
  name: string;
  description: string;
  certifiedSince: string | undefined;
  company: string | undefined;
  companyURL: string | undefined;
  brand: string | undefined;
  upc: string | undefined;
};
