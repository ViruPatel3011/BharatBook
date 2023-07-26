import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import userAvtarLogo from "../../assets/AvtarImage.jpg";
import MutualFriendsItem from "./MutualFriendsItem";
import { ISuggested } from "../../Models/Suggestions";
import { SendRequest } from "../../Services/AllApiRequests/UserRequest";
import { getAvatarImage } from "../../Services/AllApiRequests/Account";

interface SuggestionProps {
  suggestion: ISuggested;
  onRemoveSuggestion: any;
  reference?: any;
}
const SuggestedFrdItem: React.FC<SuggestionProps> = ({
  suggestion,
  onRemoveSuggestion,
  reference,
}) => {
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);

  useEffect(() => {
    const getSuggestedUserAvtar = async () => {
      if (suggestion.avatar) {
        const avtarImage = await getAvatarImage(suggestion.avatar);
        setUserAvatar(avtarImage);
      }
    };
    getSuggestedUserAvtar();
  }, [suggestion.avatar]);

  const handleSendRequest = async () => {
    try {
      await SendRequest(suggestion.userId);
      setIsSent(true);
      console.log("request send");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      onRemoveSuggestion(suggestion.userId);
    } catch (err) {
      throw err;
    }
  };

  return (
    <React.Fragment>
      <Grid
        ref={reference}
        item
        sx={{
          marginBottom: "1rem",
          width: ["100%", "auto"],
        }}
      >
        <Card
          sx={{
            height: "100%",
            width: ["100%", 230],
            border: ["none", "1px solid #d5d5d5"],
            display: "flex",
            flexDirection: ["row", "column"],
          }}
        >
          <CardMedia
            sx={{
              height: [300, 250, 220, 220, 200],
              width: "100%",
              borderRadius: "5px",
              cursor: "pointer",
              display: ["none", "flex"],
            }}
            image={
              userAvatar ? `data:image/png;base64,${userAvatar}` : userAvtarLogo
            }
            title="Check Profile"
          />
          <Box
            sx={{
              display: ["flex", "none"],
              justifyContent: "center",
              width: "30%",
            }}
          >
            <Avatar
              sx={{ margin: "auto", width: 70, height: 70 }}
              src={`data:image/png;base64,${userAvatar}`}
            />
          </Box>

          <Box sx={{ width: ["65%", "100%"], height: "auto" }}>
            <CardContent
              sx={{
                padding: "0 10px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  margin: "0.5rem 0 0 0",
                  fontSize: " 18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {suggestion.firstName + " " + suggestion.lastName}
              </Typography>

              <MutualFriendsItem friendId={suggestion.userId} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: ["row", "column"],
                }}
              >
                {!isSent && (
                  <Button
                    onClick={handleSendRequest}
                    sx={{
                      width: ["45%", "95%"],
                      height: ["35px", "auto"],
                      margin: ["0.2rem 0.5rem", "0.2rem 0"],
                      background: "#1877f2",
                      "&:hover": {
                        background: "#1877f2",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        textTransform: "none",
                        color: "white",
                        fontSize: [11, 18],
                      }}
                    >
                      Add Friend
                    </Typography>
                  </Button>
                )}
                {isSent && (
                  <Typography
                    sx={{
                      width: ["45%", "95%"],
                      height: ["35px", "auto"],
                      borderRadius: "10px",
                      background: " #9ae0ec",
                      padding: "0.6rem",
                      margin: "1rem 0",
                    }}
                  >
                    Friend Request Sent{" "}
                    <DoneAllOutlinedIcon sx={{ color: "green" }} />
                  </Typography>
                )}
                {!isSent && (
                  <Button
                    onClick={() => {
                      handleRemoveFriend();
                    }}
                    sx={{
                      width: ["45%", "95%"],
                      height: ["35px", "auto"],
                      margin: "0.3rem 0",
                      background: "#e5e5e5",
                      "&:hover": {
                        background: "#e5e5e5",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        textTransform: "none",
                        color: "black",
                        fontSize: [11, 18],
                      }}
                    >
                      Remove Friend
                    </Typography>
                  </Button>
                )}
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default SuggestedFrdItem;
