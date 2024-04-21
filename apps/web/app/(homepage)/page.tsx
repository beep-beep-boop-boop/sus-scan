import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import BasicSelect from "./BasicSelect";
import Searchbar from "./Searchbar";
import Items from "./Items";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";

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

// async function queryProductsCategory(cat: string) {
//   if (cat == "") {
//     const products = await db.query.products.findMany({
//       columns: {
//         id: true,
//         greenSealURL: true,
//         upc: true,
//         name: true,
//         description: true,
//         imageUrl: true,
//         productUrl: true,
//         certifiedSince: true,
//         companyName: true,
//         companyLink: true,
//         brand: true,
//       },
//       with: {
//         category: {
//           columns: {
//             name: true,
//           },
//         },
//       },
//     });
//     return products;
//   } else {
//     const products = await db.query.products.findMany({
//       columns: {
//         id: true,
//         greenSealURL: true,
//         upc: true,
//         name: true,
//         description: true,
//         imageUrl: true,
//         productUrl: true,
//         certifiedSince: true,
//         companyName: true,
//         companyLink: true,
//         brand: true,
//       },
//       with: {
//         category: {
//           columns: {
//             name: true,
//           },
//         },
//       },
//       where: (categories, { eq }) => eq(categories.id, cat),
//     });
//     return products;
//   }
// }

export default async function Page(): Promise<JSX.Element> {
  const categories = await queryCategories();
  //var products = await queryProductsCategory("");

  return (
    <main>
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

      {/* <div style={{ width: "100%", textAlign: "right" }}>
        <Typography color="gray"> Showing Items 1-20</Typography>
      </div> */}

      <Items />

      {/* <PaginationButtons numProducts={products.length} /> */}
    </main>
  );
}
