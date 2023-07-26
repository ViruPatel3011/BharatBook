import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import { getAvatarImage } from "../../Services/AllApiRequests/Account";
import { IStorySeen } from "../../Models/StorySeen";

interface StoryProps {
  storyView: IStorySeen;
}
const UserSeenGrid: React.FC<StoryProps> = ({ storyView }) => {
  const [viewAvatar, setViewsAvatar] = useState<string>("");

  useEffect(() => {
    const fetchAvtar = async () => {
      try {
        const avtarImage = await getAvatarImage(storyView.avatar);
        if (avtarImage) {
          setViewsAvatar(avtarImage);
        }
      } catch (err) {
        throw err;
      }
    };
    if (storyView.avatar) {
      fetchAvtar();
    }
  });
  
  return (
    <Box
      sx={{
        display: "flex",
        margin: "0.6rem 1rem",
        height: "60px",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <Avatar
        sx={{ margin: " auto 1rem" }}
        src={`data:image/png;base64,${viewAvatar}`}
      />
      <Typography sx={{ margin: "auto 0.6rem" }}>
        {storyView.userName}
      </Typography>
    </Box>
  );
};

export default UserSeenGrid;
