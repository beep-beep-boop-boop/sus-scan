import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
import qrForest from
import NextLink from "next/link";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Link,
} from "@mui/material/";

export default function NavBar() {
  return (
    // <ThemeProvider theme={ThemeLight}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Button component={NextLink} disabled href="/" align="left">
            sustainascan
          </Button> */}
          <Link href="/" underline="none" color="background.default">
            sustainascan
          </Link>
          <IconButton
            aria-label="scan"
            // color="background.default"
            component={NextLink}
            href="/scanner"
            style={{ right: 0 }}
          >
            <QrCodeScannerRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    // </ThemeProvider>
  );
}
