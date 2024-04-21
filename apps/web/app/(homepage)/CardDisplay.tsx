import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import tester from "./soap.jpg";
import Image from "next/image";

function openProductPage() {
  console.log("Open product page");
  const dummydata = [
    {
      id: "f56dbef9-125d-4b95-87e8-89625beedaa2",
      name: "Safely™ Hand Soap - Calm",
      category: "Handsoap",
      description:
        "Wash away impurities — not moisture. Finally! A hand soap that does everything a hand soap should — washes away dirt, grease, and impurities using mineral-based surfactant s— while coconut-based conditioning agents leave skin baby soft and smooth.",
      green_seal_link: undefined,
      product_url: "https://getsafely.com/products/calm-hand-soap",
      year: 2023,
      company_name: "Shop Safely LLC",
      company_link: "https://getsafely.com/",
      brand: "Safely™",
      upc: "",
    },
    {
      id: "f56dbef9-125d-4b95-87e8-89625beedaa2",
      name: "3M Bathroom Cleaner Concentrate 44A, 3M Flow Control System",
      category: "Handsoap",
      description:
        "Removes soap scum and scale from bathroom surfaces. RTU color: Light forest green.\nCDCC As-Used skin/eye damage & acute toxicity.",
      green_seal_link:
        "https://certified.greenseal.org/product/3m-bathroom-cleaner-concentrate-44a-3m-flow-control-system-3m",
      product_url: "https://www.3m.com/3M/en_US/commercial-cleaning-us/",
      year: 2016,
      company_name: "3M",
      company_link: "https://www.3m.com/3M/en_US/commercial-cleaning-us/",
      brand: "3M",
      upc: "50051125859290",
    },
    {
      id: "1234567890",
      name: "audrey's product",
      category: "Handsoap",
      description: "very good product",
      green_seal_link:
        "https://certified.greenseal.org/product/3m-bathroom-cleaner-concentrate-44a-3m-flow-control-system-3m",
      product_url: "https://www.3m.com/3M/en_US/commercial-cleaning-us/",
      year: 2016,
      company_name: "3M",
      company_link: "https://www.3m.com/3M/en_US/commercial-cleaning-us/",
      brand: "3M",
      upc: "4900007237",
    },
  ];
  return dummydata;
}

export default function CardDisplay() {
  const dummydata = openProductPage();

  return (
    <>
      {dummydata.map((data) => (
        <Grid item xs>
          <Card
            sx={{ maxWidth: 345, minWidth: 120 }}
            // display="flex"
            height="auto"
            width="30%"
          >
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
        </Grid>
      ))}
    </>
  );
}
