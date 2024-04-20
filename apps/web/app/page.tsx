"use client";
import Image from "next/image";
// import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
//import { Button } from "@repo/ui/button";
import IconButton from "@mui/material/IconButton";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useState } from "react";

function BasicSelect(): JSX.Element {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          label="Select Category"
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function openProductPage() {
  console.log("Open product page");
}

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2",
    },
  },
});

export default function Page(): JSX.Element {
  const [showScanner, setShowScanner] = useState(false);
  const [upc, setUpc] = useState("");

  const toggleScanner = () => {
    if (showScanner == true) {
      setShowScanner(false);
      console.log("HIDE");
    } else {
      setShowScanner(true);
      console.log("SHOW");
    }
  };

  // const [showScanner, setShowScanner] = useState(true);
  // const [upc, setUpc] = useState("default");

  // const toggleScanner = () => {
  //   console.log("show scanner");
  // };

  return (
    <main className={styles.main}>
      <ThemeProvider theme={themeLight}>
        <Box
          sx={{
            flexGrow: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs>
              <BasicSelect> </BasicSelect>
            </Grid>
            <Grid item xs>
              <IconButton
                aria-label="scan"
                color="primary"
                onClick={toggleScanner()}
              >
                <QrCodeScannerRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
            <Card sx={{ maxWidth: 345 }}>
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
        </Grid>
        {showScanner == true && (
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
        )}

        {/* Define an on-click and add className styling over color */}
      </ThemeProvider>
    </main>
  );
}
