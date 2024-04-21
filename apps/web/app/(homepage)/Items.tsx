import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import tester from "./soap.jpg";
import Image from "next/image";
import { db } from "../../lib/database/db";

async function queryProducts() {
  const products = await db.query.products.findMany({
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
    limit: 20,
    // where: (categories, { and, eq, sql }) =>
    //   // find products category == cat
    //   // AND (where any tokens in the searchParams are present in either the name or description)
    //   and(
    //     // eq(categories.id, cat),
    //     sql`to_tsvector(name || ' ' || description) @@ to_tsquery(${searchParams.join(" | ")});
    // `
    //   ),
  });

  return products;
}

export default async function Items() {
  const products = await queryProducts();

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(360px, 1fr))"
      gap="1px"
      bgcolor={"#f5f5f5"}
    >
      {products.map((data) => (
        <Card variant="outlined" sx={{ border: "none" }}>
          <CardActionArea
            href={`/product/${data.id}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardMedia>
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
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="body1" component="div">
                {data.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {data.brand}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
