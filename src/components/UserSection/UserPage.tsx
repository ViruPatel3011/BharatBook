import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

const UserPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: ["100%","100%","55%"],
        backgroundColor: "#f0f2f5",
        maxHeight: "100vh",
        overflow: "scroll",
      }}
    >
      <Typography
        sx={{
          margin: "1.5rem 2rem 0.5rem 2rem",
          padding: "1rem 1rem 0rem 1rem",
          fontSize: "18px",
          color: "gray",
        }}
      >
        Recent Activity
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          margin: "1rem 3rem",
          padding: "1rem 1rem",
          borderRadius: "10px",
        }}
      >
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ marginBottom: "1rem", fontSize: "20px", color: "gray" }}
          >
            Suggested for you
          </Typography>
          <MoreHorizIcon sx={{ cursor: "pointer" }} />
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ flexWrap: "nowrap", overflow: "hidden" }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(3)).map((_, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: "-3px 5px 10px -7px rgba(0, 0, 0, 0.75)",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="185"
                  image="https://source.unsplash.com/random?peoples"
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Group Name
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginRight: "0.5rem" }}
                    >
                      434 members
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      4 posts a week
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginTop: "0.3rem" }}>
                    <Avatar
                      src="https://shorturl.at/rwB46"
                      sx={{ border: "2px solid white", zIndex: "100" }}
                    />
                    <Avatar
                      src="https://cdn.pixabay.com/photo/2023/05/19/04/31/road-8003640_1280.jpg"
                      sx={{
                        marginLeft: "-15px",
                        border: "2px solid white",
                        zIndex: "80",
                      }}
                    />
                    <Avatar
                      src="https://shorturl.at/syIJZ"
                      sx={{
                        marginLeft: "-15px",
                        border: "2px solid white",
                        zIndex: "70",
                      }}
                    />
                    <Typography sx={{ fontSize: "15px", color: "gray" }}>
                      Viral and 10 Friend are Members
                    </Typography>
                  </Box>

                  <Box sx={{ margin: "0.4rem" }}>
                    <Button
                      variant="outlined"
                      startIcon={<GroupsRoundedIcon />}
                      sx={{
                        width: "100%",
                        backgroundColor: "#e8f4ff",
                        border: "none",
                        borderRadius: "10px",
                        color: "#2e81f4",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#e8f4ff",
                          border: "none",
                          boxShadow: ["5px 5px 7px -7px rgba(0, 0, 0, 0.75)"],
                        },
                      }}
                    >
                      Join Group
                    </Button>
                  </Box>
                </CardContent>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: "#bdbdbd",
                    borderRadius: "50%",
                    padding: "0.2rem",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#bdbdbd",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "17px",
            fontWeight: "600",
            color: "#2e81f4",
            cursor: "pointer",
          }}
        >
          See more Groups
        </Typography>
      </Box>{" "}
      <Box
        sx={{
          backgroundColor: "white",
          margin: "1rem 3rem",
          padding: "1rem 1rem",
          borderRadius: "10px",
        }}
      >
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ marginBottom: "1rem", fontSize: "20px", color: "gray" }}
          >
            Suggested for you
          </Typography>
          <MoreHorizIcon sx={{ cursor: "pointer" }} />
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ flexWrap: "nowrap", overflow: "hidden" }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(3)).map((_, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: "-3px 5px 10px -7px rgba(0, 0, 0, 0.75)",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="185"
                  image="https://source.unsplash.com/random?peoples"
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Group Name
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginRight: "0.5rem" }}
                    >
                      434 members
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      4 posts a week
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginTop: "0.3rem" }}>
                    <Avatar
                      src="https://shorturl.at/rwB46"
                      sx={{ border: "2px solid white", zIndex: "100" }}
                    />
                    <Avatar
                      src="https://cdn.pixabay.com/photo/2023/05/19/04/31/road-8003640_1280.jpg"
                      sx={{
                        marginLeft: "-15px",
                        border: "2px solid white",
                        zIndex: "80",
                      }}
                    />
                    <Avatar
                      src="https://shorturl.at/syIJZ"
                      sx={{
                        marginLeft: "-15px",
                        border: "2px solid white",
                        zIndex: "70",
                      }}
                    />
                    <Typography sx={{ fontSize: "15px", color: "gray" }}>
                      Viral and 10 Friend are Members
                    </Typography>
                  </Box>

                  <Box sx={{ margin: "0.4rem" }}>
                    <Button
                      variant="outlined"
                      startIcon={<GroupsRoundedIcon />}
                      sx={{
                        width: "100%",
                        backgroundColor: "#e8f4ff",
                        border: "none",
                        borderRadius: "10px",
                        color: "#2e81f4",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#e8f4ff",
                          border: "none",
                          boxShadow: ["5px 5px 7px -7px rgba(0, 0, 0, 0.75)"],
                        },
                      }}
                    >
                      Join Group
                    </Button>
                  </Box>
                </CardContent>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: "#bdbdbd",
                    borderRadius: "50%",
                    padding: "0.2rem",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#bdbdbd",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "17px",
            fontWeight: "600",
            color: "#2e81f4",
            cursor: "pointer",
          }}
        >
          See more Groups
        </Typography>
      </Box>
    </Box>
  );
};

export default UserPage;
