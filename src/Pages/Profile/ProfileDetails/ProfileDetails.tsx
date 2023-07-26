import React, { useContext } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import UserContext from "../../../Context/UserContext";
import { IUserRequest } from "../../../Models/FriendsRequest";
import UserFriends from "./UserFriends";

interface ProfileProps {
  totalFriends: number;
  allFriendsData: IUserRequest[];
}
const ProfileDetails: React.FC<ProfileProps> = ({
  totalFriends,
  allFriendsData,
}) => {
  const { userData } = useContext(UserContext);

  return (
    <React.Fragment>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {userData.firstName + " " + userData.lastName}
      </Typography>
      <Typography sx={{ fontSize: "0.8rem", fontWeight: 550, color: "gray" }}>
        {totalFriends} Friends
      </Typography>
      <Box sx={{ display: "flex", marginRight: 0.5, marginBottom: "1rem" }}>
        {allFriendsData.map((friendData) => (
          <UserFriends key={friendData.requestId} friendsDetails={friendData} />
        ))}
      </Box>
    </React.Fragment>
  );
};

export default ProfileDetails;
