import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widget from "../../components/Widget/Widget";
import HeaderIcons from "../../components/Header/HeaderIcons";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="header">
          <Header />
          <Box
            sx={{
              // display: ["flex", "flex", "none"],
              display: ["flex", "flex", "none"],
              boxShadow: ["0px 5px 7px -7px rgba(0, 0, 0, 0.75)"],
              justifyContent: "center",
              margin: "0rem",
              padding: " 0.3rem 0.5rem",
              position: ["sticky", "sticky", "sticky"],
              top: 0,
              zIndex: 100,
              backgroundColor: "white",
            }}
          >
            <HeaderIcons />
          </Box>
        </div>
      </Box>

      <Box sx={{ display: "flex", height: "90vh" }}>
        <Sidebar />
        <Outlet />
        <Widget />
      </Box>
    </React.Fragment>
  );
};

export default Home;
