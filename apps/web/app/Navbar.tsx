import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NextLink from "next/link";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sus-Scan
          </Typography>
          <IconButton
            aria-label="scan"
            color="primary"
            component={NextLink}
            href="/scanner"
            align="right"
            sx={{ flexGrow: 1 }}
          >
            <QrCodeScannerRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
