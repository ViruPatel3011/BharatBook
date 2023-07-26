import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import SellingItem from "./SellingItem";

const MarketPlace: React.FC = () => {
  const sellingItems = [
    {
      img: "https://shorturl.at/ftHU9",
      price: "₹8,999",
      description:
        "Imported Foldbale Fat Cycles with 21 Gears Dual Disc Breakes Dual Suspe..",
      location: "Ahmedabad, GJ",
    },
    {
      img: "https://shorturl.at/nsz34",
      price: "₹30,959",
      description: "Drone Camera (Free delivery)",
      location: "Ahmedabad, GJ",
    },
    {
      img: "https://shorturl.at/aoDM9",
      price: "₹3399",
      description: "Plain Shirt",
      location: "Ahmedabad, GJ",
    },
    {
      img: "https://shorturl.at/HIJKW",
      price: "₹1,35,000",
      description: "KTM RC 200",
      location: "Ahmedabad, GJ",
    },
    {
      img: "https://shorturl.at/ijz58",
      price: "₹40,000",
      description: "HP Ryzen 5",
      location: "Ahmedabad, GJ",
    },
    {
      img: "https://shorturl.at/dhAFI",
      price: "₹1,40,000",
      description: "Iphone 13 pro max",
      location: "Ahmedabad, GJ",
    },
    {
      img: "https://shorturl.at/kzHN1",
      price: "₹8,40,000",
      description: "Hyundai Verna",
      location: "Ahmedabad, GJ",
    },
    {
      img: "https://shorturl.at/vMO04",
      price: "₹70,000",
      description: "Apple Watch series 7",
      location: "Ahmedabad, GJ",
    },
  ];
  return (
    <Box
      sx={{
        width: ["100%", "100%", "75%", "55%"],
        overflow: "scroll",
      }}
    >
      <Box sx={{ padding: 3 }}>
        <Typography
          sx={{
            margin: "1.5rem 1.5rem 0 1.3rem",
            fontSize: "22px",
            fontWeight: " bold",
          }}
        >
          Today's picks
        </Typography>

        <Grid xs={12} sx={{ margin: "10px 0" }} item>
          <Grid container justifyContent="start" spacing={2}>
            {sellingItems.map((item, index) => (
              <SellingItem
                key={index}
                img={item.img}
                price={item.price}
                description={item.description}
                location={item.location}
              />
            ))}
          </Grid>
        </Grid>
      </Box>

 
    </Box>
  );
};

export default MarketPlace;
