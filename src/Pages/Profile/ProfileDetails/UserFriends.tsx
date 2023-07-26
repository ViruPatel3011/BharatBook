import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { getAvatarImage } from "../../../Services/AllApiRequests/Account";
import { IUserRequest } from "../../../Models/FriendsRequest";
import { RequestTypeString } from "../../../Utils/const";
interface FriendsDataProps {
  friendsDetails: IUserRequest;
}
const UserFriends: React.FC<FriendsDataProps> = ({ friendsDetails }) => {
  const [userImg, setUserImg] = useState<string>("");

  const avatarImg =
    friendsDetails.requestType == RequestTypeString.RECEIVED
      ? friendsDetails.fromAvatar
      : friendsDetails.toAvatar;

  useEffect(() => {
    if (avatarImg) {
      const getUserAvatar = async () => {
        try {
          if (avatarImg) {
            const avtarImg = await getAvatarImage(avatarImg);
            if (avtarImg) {
              setUserImg(avtarImg);
            }
          }
        } catch (err) {
          throw err;
        }
      };
      getUserAvatar();
    }
  }, [avatarImg]);

  
  return (
    <React.Fragment>
      <Avatar
        src={`data:image/png;base64, ${userImg}`}
        sx={{
          width: 20,
          height: 20,
          marginLeft: "-5px",
          zIndex: 15,
          border: "1px solid white",
        }}
      />
    </React.Fragment>
  );
};

export default UserFriends;
