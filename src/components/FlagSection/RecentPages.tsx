import React,{CSSProperties} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const pagesLikedByStyle:CSSProperties = {
  width: 20,
  height: 20,
  marginLeft: "-5px",
  zIndex: 15,
  border: "1px solid white",
};

const RecentPages:React.FC = () => {
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
            sx={{ fontSize: [13, 15], marginTop: 0.5 }}
          >
            Musician/Bond
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
                src="https://cdn.pixabay.com/photo/2023/05/02/15/52/support-7965543_640.jpg"
                sx={pagesLikedByStyle}
              />
              <Avatar
                src="https://cdn.pixabay.com/photo/2023/04/11/04/59/bird-7915772_1280.jpg"
                sx={pagesLikedByStyle}
              />
            </Box>
            ABC, XYZ and 32 others like this
          </Typography>
          <Grid
            container
            sx={{ margin: "20px 0", justifyContent: "space-between" }}
          >
            <Grid item xs={7.6} sm={9.6}>
              <Button
                sx={{
                  width: "100%",
                  background: "#e8f4ff",
                  "&:hover": {
                    background: "#e8f4ff",
                  },
                  height: 45,
                }}
              >
                <Typography
                  sx={{
                    textTransform: "none",
                    color: "#1877f2",
                    fontWeight: 700,
                  }}
                >
                  Call Now
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={4} sm={2}>
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
                <Typography sx={{ textTransform: "none", color: "black" }}>
                  <ThumbUpOffAltIcon />
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RecentPages;
