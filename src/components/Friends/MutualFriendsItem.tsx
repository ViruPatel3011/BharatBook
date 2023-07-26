import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, Avatar } from "@mui/material";
import { getMutualFriends } from "../../Services/AllApiRequests/User";
import { getAvatarImage } from "../../Services/AllApiRequests/Account";

interface friendProps {
  friendId: number;
}
const MutualFriendsItem: React.FC<friendProps> = ({ friendId }) => {
  const [mutualFrdCount, setMutualFrdCount] = useState<number>(0);
  const [avtarImages, setAvatarImages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const mutualFriends = await getMutualFriends(1, 10, friendId);
      const records = mutualFriends.records;

      setMutualFrdCount(records.length);

      const avatarPromises = records.slice(0, 3).map((friend) => {
        if (friend.avatar) {
          return getAvatarImage(friend.avatar);
        }
      });

      try {
        const avatarImages = await Promise.all(avatarPromises);
        setAvatarImages(avatarImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", marginRight: 0.5 }}>
        {avtarImages.map((image, index) => (
          <Avatar
            key={index}
            src={`data:image/png;base64,${image}`}
            sx={{
              width: 20,
              height: 20,
              marginLeft: "-5px",
              zIndex: 15,
              border: "1px solid white",
            }}
          />
        ))}

        {mutualFrdCount > 3 && (
          <Typography
            key="more"
            sx={{
              marginLeft: "0 0.6rem",
              zIndex: 15,
              color: "black",
              fontSize: ["0.8rem", "1rem"],
            }}
          >
            +{mutualFrdCount - 3} others
          </Typography>
        )}

        {mutualFrdCount <= 3 && mutualFrdCount > 0 && (
          <Typography sx={{ fontSize: ["0.7rem", "1rem"] }}>
            {mutualFrdCount}
            {mutualFrdCount === 1 ? " Mutual Friend" : " Mutual Friends"}
          </Typography>
        )}
      </Box>
    </React.Fragment>
  );
};

export default MutualFriendsItem;
