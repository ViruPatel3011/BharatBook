import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, Avatar, Divider } from "@mui/material";

interface HeaderTextProps {
  headerText: string;
}
const FriendsHeader: React.FC<HeaderTextProps> = ({ headerText }) => {
  return (
    <React.Fragment>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          margin: "1rem",
          padding: "0.5rem",
          borderRadius: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              margin: ["0.5rem", "1rem"],
              fontSize: [16, 22],
              fontWeight: " bold",
            }}
          >
            {headerText}
          </Typography>
        </Box>
       
      </Grid>
      <Divider />
    </React.Fragment>
  );
};

export default FriendsHeader;
