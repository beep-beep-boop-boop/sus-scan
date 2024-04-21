// import db from "../../lib/database/db";
import { db } from "./../../../lib/database/db";
import NextLink from "next/link";
import { Typography, Link, Button } from "@mui/material/";
import { CheckCircle, Paid } from "@mui/icons-material/";

export default async function ProductUpc({
  params,
}: {
  params: { upc: string };
}) {
  // get upc from url
  const productUpc = params.upc;

  // query database for product information
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
      greenSealURL: true,
      upc: true,
      name: true,
      description: true,
      imageUrl: true,
      productUrl: true,
      certifiedSince: true,
      companyName: true,
      companyLink: true,
      brand: true,
    },
    with: {
      category: {
        columns: {
          name: true,
        },
      },
    },
    where: (products, { eq }) => eq(products.upc, productUpc), // args: products table, operators.eq: function that compares products.upc and productUpc
  });

  if (product != undefined) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div id="product-header">
          <Typography variant="h1">{product.name}</Typography>
          {product.companyLink != undefined && (
            <Typography>
              <Link href={product.companyLink} variant="h6">
                {product.companyName}
              </Link>
              ,{product.brand}
            </Typography>
          )}
          {product.companyLink == undefined && (
            <Typography variant="h6">
              {product.companyName}, {product.brand}
            </Typography>
          )}
        </div>

        <div>
          <img />
          <Typography variant="subtitle1">{product.upc}</Typography>
          <Typography variant="subtitle1">{product.certifiedSince}</Typography>
          <Typography variant="body2">{product.description}</Typography>
        </div>

        <div
          id="product-links"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            component={NextLink}
            href={product.greenSealURL}
            align="right"
            sx={{ flexGrow: 1 }}
          >
            <CheckCircle /> Green Seal Listing
          </Button>
          {product.productUrl != undefined && (
            <Button
              variant="outlined"
              color="primary"
              component={NextLink}
              href={product.productUrl}
              align="right"
              sx={{ flexGrow: 1 }}
            >
              <Paid /> Where to Buy
            </Button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <h5>
        Product not found :( ... consider these similar, sustainable products:
        (coming soon)
      </h5>
      // TO-DO: use an API to find the name / description of the product
      // TO-DO: find similar items by calling queryProducts() with category = undefined, searchParams = name + (description)
    );
  }
}
