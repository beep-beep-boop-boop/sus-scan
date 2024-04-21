import ScannerHolder from "./ScannerHolder";
import { Button, Typography } from "@mui/material/";
import NextLink from "next/link";
import styles from "./page.module.css";
import NavBar from "../Navbar";
import { useState } from "react";
import ThemeProvider from "@mui/material/styles";
import ThemeLight from "../ThemeLight";

export default function ScannerPage(): JSX.Element {
  return (
    <main className={styles.main}>
      <div>
        <ScannerHolder />
      </div>
    </main>
  );
}

// // import Image from "next/image";
// // // import { Card } from "@repo/ui/card";
// // import { Code } from "@repo/ui/code";
// // //import { Button } from "@repo/ui/button";
// // import IconButton from "@mui/material/IconButton";
// // import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
// // import CssBaseline from "@mui/material/CssBaseline";
// // import { ThemeProvider, createTheme } from "@mui/material/styles";
// // import Grid from "@mui/material/Grid";
// // import Button from "@mui/material/Button";

// // import * as React from "react";
// // import Box from "@mui/material/Box";
// // import InputLabel from "@mui/material/InputLabel";
// // import MenuItem from "@mui/material/MenuItem";
// // import FormControl from "@mui/material/FormControl";
// // import Select, { SelectChangeEvent } from "@mui/material/Select";
// // import Card from "@mui/material/Card";
// // import CardContent from "@mui/material/CardContent";
// // import CardMedia from "@mui/material/CardMedia";
// // import Typography from "@mui/material/Typography";
// // import { CardActionArea } from "@mui/material";

// import BarcodeScannerComponent from "react-qr-barcode-scanner";
// import { useState } from "react";
// // // import SearchBar from "material-ui-search-bar";

// const themeLight = createTheme({
//   palette: {
//     background: {
//       default: "#e4f0e2",
//     },
//   },
// });

// export default function Scanner(): JSX.Element {
//   // const [showScanner, setShowScanner] = useState(false);
//   // const [upc, setUpc] = useState("");

//   // const toggleScanner = () => {
//   //   if (showScanner == true) {
//   //     setShowScanner(false);
//   //     console.log("HIDE");
//   //   } else {
//   //     setShowScanner(true);
//   //     console.log("SHOW");
//   //   }
//   // };
//   const [showScanner, setShowScanner] = useState(true);
//   const [upc, setUpc] = useState("default");
//   const [searchValue, setSearchValue] = useState("");

//   const toggleScanner = () => {
//     console.log("show scanner");
//   };

//   return (
//     <main className={styles.main}>
//       {/* <ThemeProvider theme={themeLight}>
//         <Grid
//           container
//           spacing={2}
//           sx={{
//             flexGrow: 1,
//             flexDirection: "row",
//             alignItems: "center", // aligns Items in their boxes
//           }}
//           justifyContent="center"
//         >
//           <Grid item>
//             <SearchBar
//               value={searchValue}
//               onChange={setSearchValue}
//               onRequestSearch={() => console.log("searching for", searchValue)}
//               style={{
//                 margin: "0 auto",
//                 minWidth: 800,
//                 maxWidth: 1000,
//               }}
//             />
//           </Grid>
//           <Grid item>
//             <BasicSelect> </BasicSelect>
//           </Grid>
//           <Grid item>
//             <IconButton
//               aria-label="scan"
//               color="primary"
//               onClick={toggleScanner()}
//             >
//               <QrCodeScannerRoundedIcon />
//             </IconButton>
//           </Grid>
//         </Grid>

//         <Grid
//           container
//           spacing={2}
//           sx={{
//             flexGrow: 1,
//             flexDirection: "row",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Grid item xs>
//             <Card sx={{ maxWidth: 345 }}>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   image="/app/static/images/products/IMG_5793.jpg"
//                   alt="product img"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     Product Name
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Product Price
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//           <Grid item xs>
//             <Card sx={{ maxWidth: 345 }}>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   image="/app/static/images/products/IMG_5793.jpg"
//                   alt="product img"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     Product Name
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Product Price
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//           <Grid item xs>
//             <Card sx={{ maxWidth: 345 }}>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   image="/app/static/images/products/IMG_5793.jpg"
//                   alt="product img"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     Product Name
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Product Price
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//           <Grid item xs>
//             <Card sx={{ maxWidth: 200 }}>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   image="/static/images/products/IMG_5793.jpg"
//                   alt="product img"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     Product Name
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Product Price
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         </Grid>

//         {showScanner == true && (
//           <div>
//             <BarcodeScannerComponent
//               width={500}
//               height={500}
//               onUpdate={(err, result) => {
//                 if (result) {
//                   setUpc(result.text);
//                 } else {
//                   setUpc("Not Found");
//                 }
//               }}
//             />
//             <p>UPC IS: {upc}</p>
//           </div>
//         )}

//         {/* Define an on-click and add className styling over color */}
//       </ThemeProvider> */}
//     </main>
//   );
// }
