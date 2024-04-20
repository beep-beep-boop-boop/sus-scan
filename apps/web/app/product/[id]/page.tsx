import { db } from "../../../lib/database/db";
// import NextLink from "next/link";
import { Typography, Link, IconButton } from "@mui/material/";
import { CheckCircle, Paid } from "@mui/icons-material/";

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
      <div>
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

        <div id="product-links">
          <IconButton
            aria-label="Green Seal Listing"
            color="primary"
            href={product.greenSealURL}
            align="right"
            sx={{ flexGrow: 1 }}
          >
            <CheckCircle />
          </IconButton>
          <IconButton
            aria-label="Where to Buy"
            color="primary"
            href={product.productUrl}
            align="right"
            sx={{ flexGrow: 1 }}
          >
            <Paid />
          </IconButton>
        </div>
      </div>
    );
  }
}
