import React, { CSSProperties } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RecentPages from "./RecentPages";
import SuggestedPages from "./SuggestedPages";

const buttonStyle = {
  background: "#e5e5e5",
  color: "black",
  borderRadius: 5,
  "&:hover": {
    background: "#c9c7c7",
  },
  margin: 2,
  padding: "5px 10px",
};

const mainGridStyle: CSSProperties = {
  background: "white",
  borderRadius: 2,
  padding: 2,
  marginBottom: 3,
};

const subGridStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid lightgray",
};

const Flag: React.FC = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          width: ["100%", "100%", "75%", "55%"],
          maxHeight: "100vh",
          overflowY: "scroll",
          paddingTop: [0, 2],
          margin: ["0", "0 30px"],
        }}
      >
        <Box
          sx={{
            background: ["white", "transparent"],
            borderRadius: [0, 3],
            padding: "20px 0",
          }}
        >
          <Grid sx={mainGridStyle}>
            <Grid sx={subGridStyle}>
              <Typography variant="h5" color="initial">
                Pages
              </Typography>
              <IconButton>
                <Avatar>
                  <SearchIcon />
                </Avatar>
              </IconButton>
            </Grid>
            <Grid>
              <Button sx={buttonStyle}>
                <AddCircleIcon sx={{ marginRight: 0.5 }} />
                <Typography sx={{ textTransform: "none" }}>Create</Typography>
              </Button>
              <Button sx={buttonStyle}>
                <ThumbUpOutlinedIcon sx={{ marginRight: 0.5 }} />
                <Typography sx={{ textTransform: "none" }}>
                  Liked Pages
                </Typography>
              </Button>
              <Button sx={buttonStyle}>
                <GroupAddIcon sx={{ marginRight: 0.5 }} />
                <Typography sx={{ textTransform: "none" }}>Invites</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid sx={mainGridStyle}>
            <Grid sx={subGridStyle}>
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontWeight: 700, paddingBottom: 1 }}
              >
                Recently Visited Pages
              </Typography>
              <Typography sx={{ color: "#1877f2", cursor: "pointer" }}>
                See all
              </Typography>
            </Grid>
            <RecentPages />
          </Grid>
          <Grid sx={mainGridStyle}>
            <Grid sx={subGridStyle}>
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontWeight: 700, paddingBottom: 1 }}
              >
                Suggested Pages
              </Typography>
            </Grid>
            <SuggestedPages />
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Flag;
