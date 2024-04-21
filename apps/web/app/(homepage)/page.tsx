import styles from "./page.module.css";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Typography from "@mui/material/Typography";

import BasicSelect from "./BasicSelect";
import Searchbar from "./Searchbar";
import ThemeLight from "../ThemeLight";
import CardDisplay from "./CardDisplay";

import { ThemeProvider } from "@mui/material/styles";
import { db } from "../../lib/database/db";

async function queryCategories() {
  const categories = await db.query.categories.findMany({
    columns: {
      id: true,
      name: true,
    },
  });

  return categories;
}

async function queryProductsCategory(cat: string) {
  if (cat == "") {
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
    });
    return products;
  } else {
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
      where: (categories, { eq }) => eq(categories.id, cat),
    });
    return products;
  }
}

// async function queryProducts(cat: string, searchParam: string) {
//   const searchParams = searchParam.split(" ");

//   const products = await db.query.products.findMany({
//     columns: {
//       id: true,
//       greenSealURL: true,
//       upc: true,
//       name: true,
//       description: true,
//       imageUrl: true,
//       productUrl: true,
//       certifiedSince: true,
//       companyName: true,
//       companyLink: true,
//       brand: true,
//     },
//     with: {
//       category: {
//         columns: {
//           name: true,
//         },
//       },
//     },
//     where: (categories, { and, eq, sql }) =>
//       // find products category == cat
//       // AND (where any tokens in the searchParams are present in either the name or description)
//       and(
//         // eq(categories.id, cat),
//         sql`to_tsvector(name || ' ' || description) @@ to_tsquery(${searchParams.join(" | ")});
//     `
//       ),
//   });

//   return products;
// }

export default async function Page(): Promise<JSX.Element> {
  const categories = await queryCategories();
  // const products = await queryProducts("", "soap handdl");
  //var products = await queryProductsCategory("");

  return (
    <main className={styles.main}>
      <ThemeProvider theme={ThemeLight}>
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            flexDirection: "row",
            alignItems: "center", // aligns Items in their boxes
          }}
          justifyContent="center"
        >
          <Grid item xs>
            <Searchbar />
          </Grid>
          <Grid item xs>
            <BasicSelect
              categories={categories}
              //onCategoryChange={queryProductsCategory}
            />
          </Grid>
        </Grid>

        <div style={{ width: "100%", textAlign: "right" }}>
          <Typography color="gray"> Showing Items 1-20</Typography>
        </div>

        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            flexDirection: "row",
            alignItems: "stretch", // aligns Items in their boxes
          }}
          justifyContent="center"
        >
          <CardDisplay />
        </Grid>

        {/* <PaginationButtons numProducts={products.length} /> */}
      </ThemeProvider>
    </main>
  );
}
