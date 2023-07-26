import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import SidebarIcons from "./SidebarIcons";
import BharatBook from "../../assets/BharatBook1.png";

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        boxShadow: "0px 5px 17px -7px rgba(0, 0, 0, 0.75)",
        width: ["35%", "35%", "22%"],
        display: ["none", "none", "block"],
        // backgroundColor:"#f0f2f5",
        height: "100%",
      }}
    >
      <SidebarIcons />

      <Box
        sx={{
          width: "75%",
          height: "70px",
          margin: "2rem auto 0 auto",
          backgroundImage: `url(${BharatBook})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          borderRadius: "10px",
        }}
      ></Box>
      <Typography
        sx={{ textAlign: "center", fontSize: "1.4rem", fontFamily: "cursive" }}
      >
        Connect To The World
      </Typography>
    </Box>
  );
};

export default Sidebar;
