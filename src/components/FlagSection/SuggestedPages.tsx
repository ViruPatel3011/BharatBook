import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const SuggestedPages:React.FC = () => {
  return (
    <React.Fragment>
      <Grid container sx={{ margin: "20px 0", padding: ["10px", 0] }}>
        <Grid
          item
          xs={3}
          sm={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar
            src="https://shorturl.at/rwB46"
            sx={{ width: [70, 80], height: [70, 80] }}
          ></Avatar>
        </Grid>
        <Grid item xs={9} sm={10} sx={{ borderBottom: "1px solid lightgray" }}>
          <Typography
            color="initial"
            sx={{ fontSize: [14, 16], fontWeight: 700, marginTop: 0.5 }}
          >
            V Pages
          </Typography>
          <Typography
            color="initial"
            sx={{
              fontSize: [12, 13],
              display: "flex",
              alignItems: "center",
              marginTop: 0.5,
            }}
          >
            <Box sx={{ display: "flex", marginRight: 0.5 }}>
              <Avatar
                src="https://shorturl.at/rwB46"
                sx={{
                  width: 20,
                  height: 20,
                  marginLeft: "-5px",
                  zIndex: 15,
                  border: "1px solid white",
                }}
              />
              <Avatar
                src="https://shorturl.at/rwB46"
                sx={{
                  width: 20,
                  height: 20,
                  marginLeft: "-5px",
                  zIndex: 20,
                  border: "1px solid white",
                }}
              />
            </Box>
            ABC, XYZ and 32 others like this
          </Typography>
          <Grid
            container
            sx={{ margin: "20px auto", justifyContent: "space-between" }}
          >
            <Grid item xs={5.8}>
              <Button
                sx={{
                  width: "100%",
                  background: "#1877f2",
                  "&:hover": {
                    background: "#1877f2",
                  },
                  height: 45,
                }}
              >
                <Typography
                  sx={{
                    textTransform: "none",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ThumbUpOffAltIcon sx={{ marginRight: 0.5 }} />
                  Like
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={5.8}>
              <Button
                sx={{
                  width: "100%",
                  background: "#e5e5e5",
                  "&:hover": {
                    background: "#e5e5e5",
                  },
                  height: 45,
                }}
              >
                <Typography
                  sx={{
                    textTransform: "none",
                    color: "black",
                    fontWeight: 700,
                  }}
                >
                  Remove
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SuggestedPages;
