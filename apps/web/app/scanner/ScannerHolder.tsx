"use client";
import ScannerWindow from "./Scanner";
import { Button, Typography, Link } from "@mui/material/";
import NextLink from "next/link";
import styles from "./page.module.css";
import NavBar from "../Navbar";
import { useState } from "react";

export default function ScannerPage(): JSX.Element {
  const [upc, setUpc] = useState("DEFAULT");
  const redirectToUpc = () => {};
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5">Please scan product barcode:</Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ScannerWindow parentUpc={upc} setParentUpc={redirectToUpc} />
        <Typography variant="h5">UPC: {upc}</Typography>
      </div>
      <Button variant="contained" href={`/product-upc/${upc}`}>
        Check Product!
      </Button>
    </div>
  );
}
