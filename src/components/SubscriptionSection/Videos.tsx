import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedIcon from "@mui/icons-material/Verified";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import songImage from "../../assets/songImage.jpg";

const Subscription: React.FC = () => {
  return (
    <Box
      sx={{
        width: ["100%", "100%", "55%"],
        maxHeight: "100vh",
        overflow: "scroll",
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((value) => (
        <Card
          key={value}
          sx={{
            display: "flex",
            flexDirection: ["column", "row", "row"],
             margin: "2rem 2rem",
            boxShadow: "3px 5px 7px -8px rgba(0, 0, 0, 0.75)",
            border: "1px solid #f1f1f1",
            borderRadius: "5px",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              sx={{
                width: ["100%", 250, 230, 300],
                height: [200, 180, 220, 200],
                borderRadius: "5px",
                cursor: "pointer",
                position: "relative",
              }}
              image={songImage}
              alt="Live from space album cover"
            />

            <Typography
              color="initial"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                background: "rgba(0,0,0,0.7)",
                borderRadius: 5,
                padding: "2px 5px",
                color: "white",
              }}
            >
              20:20
            </Typography>

            <Box
              sx={{
                width: ["100%", 250, 230, 300],
                height: [200, 180, 250, 200],
                borderRadius: "5px",
                position: "absolute",
                top: 0,
                left: 0,
                "&:hover": {
                  background: "rgba(0,0,0,0.4)",
                },
                "&:hover .MuiSvgIcon-root": {
                  display: "block",
                },
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <PlayArrowIcon
                  sx={{
                    fontSize: "3rem",
                    color: "white",
                    background: "black",
                    borderRadius: "50%",
                    opacity: 0.6,
                    display: "none",
                  }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto", position: "relative" }}>
              <Typography component="div" variant="h6">
                Song number 1
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Out Now
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ color: "gray" }}>Arijit Singh</Typography>
                <VerifiedIcon sx={{ color: "#4FB6EC", margin: "4px" }} />
              </Box>

              <Typography sx={{ color: "gray" }}>
                28 Oct 2022 | 17M Views
              </Typography>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  padding: "2px",
                }}
              >
                <MoreHorizIcon sx={{ cursor: "pointer" }} />
              </IconButton>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default Subscription;
