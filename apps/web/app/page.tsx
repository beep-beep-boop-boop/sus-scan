import Image from "next/image";
// import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
//import { Button } from "@repo/ui/button";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";

// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
import BasicSelect from "./BasicSelect";
import Searchbar from "./Searchbar";
import ThemeLight from "./ThemeLight";
import CardDisplay from "./CardDisplay";
import PaginationButtons from "./Pagination";

import NextLink from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import { db } from "../lib/database/db";

async function queryCategories() {
  const categories = await db.query.categories.findMany({
    columns: {
      id: true,
      name: true,
    },
  });

  return categories;
}

async function queryProducts(cat: string) {
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
    where: (categories, { eq }) => {
      eq(categories.id, cat);
    },
  });

  return products;
}

export default function Page(): JSX.Element {
  // const [showScanner, setShowScanner] = useState(false);
  // const [upc, setUpc] = useState("");

  // const toggleScanner = () => {
  //   if (showScanner == true) {
  //     setShowScanner(false);
  //     console.log("HIDE");
  //   } else {
  //     setShowScanner(true);
  //     console.log("SHOW");
  //   }
  // };
  // const [showScanner, setShowScanner] = useState(true);
  // const [upc, setUpc] = useState("default");

  // useEffect(() => {
  //   cardDisplay(data);
  // });

  // const toggleScanner = () => {
  //   console.log("show scanner");
  // };

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
            <BasicSelect />
          </Grid>
        </Grid>

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

        <PaginationButtons numProducts={50} />
        {/* <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="/app/static/images/products/IMG_5793.jpg"
                  alt="product img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Product Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product Price
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="/app/static/images/products/IMG_5793.jpg"
                  alt="product img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Product Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product Price
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="/app/static/images/products/IMG_5793.jpg"
                  alt="product img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Product Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product Price
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card sx={{ maxWidth: 200 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="/static/images/products/IMG_5793.jpg"
                  alt="product img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Product Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product Price
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid> */}

        {/* {showScanner == true && (
          <div>
            <BarcodeScannerComponent
              width={500}
              height={500}
              onUpdate={(err, result) => {
                if (result) {
                  setUpc(result.text);
                } else {
                  setUpc("Not Found");
                }
              }}
            />
            <p>UPC IS: {upc}</p>
          </div>
        )} */}

        {/* Define an on-click and add className styling over color */}
      </ThemeProvider>
    </main>
  );
}
