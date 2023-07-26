import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

const BharatBookInfo = () => {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              marginBottom: ["1rem", "1rem", "0"],
              backgroundColor: "#243e5e",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                color: "transparent",
                backgroundImage: "linear-gradient(to top, #0458ad, #12d6ff)",
                backgroundClip: "text",
                margin: "0.7rem 0.7rem 0 0.7rem",
                WebkitBackgroundClip: "text",
                fontFamily: "fantasy",
              }}
            >
              BharatBook
            </Typography>
            ;
          </Box>
          <Typography
            sx={{
              fontSize: ["", "", "20px", "25px"],
              margin: "1rem",
              textAlign: "center",
              display: ["none", "none", "block"],
              fontFamily: "SFProDisplay-Regular, Helvetica, Arial, sans-serif",
            }}
          >
            BharatBook helps you connectand share <br />
            with the people in your life
          </Typography>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default BharatBookInfo;
