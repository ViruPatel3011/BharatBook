import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Page from "../../Utils/route";

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
const activeButtonStyles = {
  background: "#a1e5ea",
};
const mainGridStyle = {
  background: "white",
  borderRadius: 2,
  padding: 2,
  marginBottom: 3,
};

const subGridStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid lightgray",
};
const Friends: React.FC = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <Box
        sx={{
          width: ["100%", "100%", "75%", "55%"],
          overflow: "scroll",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Box sx={{ padding: [1, 3, 3] }}>
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
              <Button
                sx={{
                  ...buttonStyle,
                  ...(location.pathname === Page.FRIENDS_PAGE
                    ? activeButtonStyles
                    : {}),
                }}
                component={Link}
                to={Page.FRIENDS_PAGE}
              >
                <Typography sx={{ textTransform: "none" }}>
                  Friends Request
                </Typography>
              </Button>
              <Button
                sx={{
                  ...buttonStyle,
                  ...(location.pathname === Page.SUGGESTED_PAGES
                    ? activeButtonStyles
                    : {}),
                }}
                component={Link}
                to={Page.SUGGESTED_PAGES}
              >
                <Typography sx={{ textTransform: "none" }}>
                  Suggestions
                </Typography>
              </Button>
              <Button
                sx={{
                  ...buttonStyle,
                  ...(location.pathname === Page.YOUR_FRIENDS
                    ? activeButtonStyles
                    : {}),
                }}
                component={Link}
                to={Page.YOUR_FRIENDS}
              >
                <Typography sx={{ textTransform: "none" }}>
                  Your Friends
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Friends;
