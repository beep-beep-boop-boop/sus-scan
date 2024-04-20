// returns product information for a given green seal product
export const dynamic = "force-dynamic";

import * as cheerio from "cheerio";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // grab green seal url from request
  const searchParams = request.nextUrl.searchParams;
  const greenSealURL = searchParams.get("url");

  if (!greenSealURL) {
    return new Response("Missing URL", {
      status: 400,
    });
  }

  // load HTML from product page
  const response = await fetch(greenSealURL);
  if (response.status != 200) {
    return new Response("Product not found", {
      status: 400,
    });
  }

  const html = await response.text();

  // parse with cheerio
  const $ = cheerio.load(html);
  console.log("HERE");
  console.log($);
  // const $name = $('[style="font-weight: bold; font-size: 26px;"]');
  // const $imageURL = $("img");
  // const $description = $(
  //   "#app > main > div > div:nth-child(3) > div > p:nth-child(3)"
  // ); // lol copy selector
  // const $certifiedSince = $('div:contains("Certified Since: ")');
  // const $company = $('div:contains("Company: ") > a:'); // a is direct descendant of div
  // const $companyURL = $("div > a:href");
  // const $brand = $('div:contains("Brand: ")');

  // // console.log($name, $imageURL, $description, $certifiedSince, $company, $)ompanyURL, $brand
  // console.log($name);
}
