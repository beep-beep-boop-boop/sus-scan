import { db } from "../../../lib/database/db";
import NextLink from "next/link";
import styles from "./page.module.css";
import { Typography, Link, Button } from "@mui/material/";
import { CheckCircle, Paid } from "@mui/icons-material/";
import Image from "next/image";
import tester from "./../../(homepage)/soap.jpg";

export default async function Product({ params }: { params: { id: string } }) {
  // get id from url
  const productId = params.id;
  console.log(productId);

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
    where: (products, { eq }) => eq(products.id, productId), // args: products table, operators.eq: function that compares products.id and productId
  });

  if (product != undefined) {
    return (
      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div id="product-header">
            <Typography variant="h3">{product.name}</Typography>
            {product.companyLink != undefined && (
              <Typography variant="h6">
                <Link href={product.companyLink}>{product.companyName}</Link>,
                {product.brand}
              </Typography>
            )}
            {product.companyLink == undefined && (
              <Typography variant="h6">
                {product.companyName}, {product.brand}
              </Typography>
            )}
          </div>

          <div>
            <Image
              src={tester}
              width={200}
              height={200}
              alt="product_img"
              objectFit="fill"
              style={{
                margin: "10%",
                boxSizing: "border-box",
              }}
            />

            <Typography variant="subtitle1">{product.upc}</Typography>
            <Typography variant="subtitle1">
              {product.certifiedSince}
            </Typography>
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
              // component={NextLink}
              href={product.greenSealURL}
              // align="right"
              sx={{ flexGrow: 1 }}
            >
              <CheckCircle /> Green Seal Listing
            </Button>
            {product.productUrl != undefined && (
              <Button
                variant="outlined"
                color="primary"
                // component={NextLink}
                href={product.productUrl}
                // align="right"
                sx={{ flexGrow: 1 }}
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
      <main className={styles.main}>
        <h1>ERROR :( pls help...this should never happen tho i think</h1>
      </main>
    );
  }
}
