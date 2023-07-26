import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/Cancel";
import MutualFriendsItem from "./MutualFriendsItem";
import { IYourFriend } from "../../Models/YourFriends";
import { RequestTypeString } from "../../Utils/const";
import { CancleRequest } from "../../Services/AllApiRequests/UserRequest";
import { getAvatarImage } from "../../Services/AllApiRequests/Account";

interface RequestTypesProps {
  friendRequestData: IYourFriend;
  requestType: string;
  reference?: any;
  OnRemoveFriend?: any;
}
const YourFriendsItem: React.FC<RequestTypesProps> = ({
  friendRequestData,
  requestType,
  reference,
  OnRemoveFriend,
}) => {
  const [avatarImage, setAvatarImage] = useState<string>("");
  useEffect(() => {
    const fetchUserData = async () => {
      const avatar =
        requestType === RequestTypeString.SENT
          ? friendRequestData.toAvatar
          : friendRequestData.fromAvatar;

      if (avatar) {
        const image = await getAvatarImage(avatar);
        if (image) {
          setAvatarImage(image);
        }
      }
    };

    fetchUserData();
  }, [friendRequestData, requestType]);

  const handleRemoveFriend = async () => {
    try {
      await CancleRequest(friendRequestData.requestId);
      OnRemoveFriend(friendRequestData.requestId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Grid
        ref={reference}
        container
        sx={{
          marginLeft: ["0rem", "1rem", "0rem"],
          marginBottom: ["0.5rem", "1rem"],
          borderBottom: "1px solid #ccc",
          paddingBottom: ["0.5rem", "1rem"],
          padding: 0,
        }}
      >
        <Grid
          item
          xs={3}
          sm={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: ["auto 0", "1rem 0"],
          }}
        >
          <Avatar
            src={`data:image/png;base64,${avatarImage}`}
            sx={{
              width: [55, 100, 90],
              height: [55, 100, 90],
              marginRight: ["0rem", "1rem"],
            }}
          />
        </Grid>

        <Grid item xs={5} sm={5} sx={{ marginLeft: "1rem" }}>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              color="initial"
              sx={{
                fontSize: ["0.9rem", "1.2rem"],
                fontWeight: 700,
                marginTop: "1rem",
              }}
            >
              {requestType === RequestTypeString.SENT
                ? friendRequestData.toUserName
                : friendRequestData.fromUserName}
            </Typography>
          </Grid>
          {requestType === RequestTypeString.SENT ? (
            <MutualFriendsItem friendId={friendRequestData.toUserId} />
          ) : (
            <MutualFriendsItem friendId={friendRequestData.fromUserId} />
          )}

          <Typography
            color="initial"
            sx={{
              fontSize: [12, 13],
              display: "flex",
              alignItems: "center",
              marginTop: 0.5,
            }}
          ></Typography>
          <Grid
            container
            sx={{
              margin: "20px auto",
              justifyContent: "space-between",
            }}
          ></Grid>
        </Grid>

        <Button
          onClick={handleRemoveFriend}
          sx={{
            height: "40px",
            margin: "auto 0.5rem ",
            textTransform: "none",
            backgroundColor: "#1877f2",
            display: ["none", "block"],
          }}
          variant="contained"
        >
          <Typography>Remove Friend</Typography>
        </Button>

        <Tooltip title="Remove Friend">
          <IconButton sx={{ margin: "auto 0" }}>
            <CancelIcon
              sx={{ display: ["block", "none"], fontSize: "2.1rem" }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </React.Fragment>
  );
};

export default YourFriendsItem;
