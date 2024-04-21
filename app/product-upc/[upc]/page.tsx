// import db from "../../lib/database/db";
import { db } from "./../../../lib/database/db";
import NextLink from "next/link";
import { Typography, Link, Button } from "@mui/material/";
import { CheckCircle, Paid } from "@mui/icons-material/";
import Image from "next/image";
import tester from "./../../(homepage)/soap.jpg";
import styles from "./page.module.css";

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
      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div id="product-header" style={{ marginTop: 50 }}>
            <Typography align="center" variant="h3">
              {product.name}
            </Typography>
            {product.companyLink != undefined && (
              <Typography variant="h4" align="center">
                <div>
                  <Link href={product.companyLink} textAlign="right">
                    {product.companyName}
                  </Link>
                </div>
                {product.brand}
              </Typography>
            )}
            {product.companyLink == undefined && (
              <Typography variant="h6">
                {product.companyName}, {product.brand}
              </Typography>
            )}
          </div>

          <Image
            src={tester}
            width={0.5}
            height={0.5}
            alt="product_img"
            objectFit="fill"
            style={{
              margin: "10%",
              boxSizing: "border-box",
              alignContent: "center",
            }}
          />

          <Typography variant="subtitle1">{product.upc}</Typography>
          <Typography variant="subtitle1">{product.certifiedSince}</Typography>
          <Typography variant="body2">{product.description}</Typography>

          <div
            id="product-links"
            style={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            {/* <Button
              variant="outlined"
              color="primary"
              component={NextLink}
              href={product.greenSealURL}
              align="right"
              sx={{ flexGrow: 1 }}
            >
              <CheckCircle /> Green Seal Listing
            </Button> */}
            {product.productUrl != undefined && (
              <Button
                variant="outlined"
                color="primary"
                // component={NextLink}
                href={product.productUrl}
                // align="right"
              >
                <Paid /> Where to Buy
              </Button>
            )}
          </div>
        </div>
      </main>
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
