import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import YourFriendsItem from "../../../../components/Friends/YourFriendsItem";
import { IYourFriend } from "../../../../Models/YourFriends";
import useLastItemObserver from "../../../../Utils/helper";
import { FilterStatus, RequestType } from "../../../../Utils/const";
import { SuggestLoader } from "../../../../components/Loaders/Loaders";
import { getFriendListForUser } from "../../../../Services/AllApiRequests/UserRequest";

const ProfileFriends: React.FC = () => {
  const [friendsData, setFriendsData] = useState<IYourFriend[]>([]);
  const [loadingFriend, setLoadingFriend] = useState<boolean>(true);
  const [frdPgNum, setFrdPgNum] = useState<number>(1);
  const [hasFrdMore, setHasFrdMore] = useState<boolean>(false);

  const frdListPgSize = 5;

  const lastFriendsData = useLastItemObserver(
    loadingFriend,
    hasFrdMore,
    setFrdPgNum
  );

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const friendsDetails = await getFriendListForUser(
          frdPgNum,
          frdListPgSize,
          FilterStatus.ACCEPTED,
          RequestType.ALL
        );
        if (friendsDetails) {
          setFriendsData((prevFrdData) => [
            ...prevFrdData,
            ...friendsDetails.records,
          ]);
        }

        setHasFrdMore(friendsDetails.records.length > 0);
        setLoadingFriend(false);
      } catch (err) {
        throw err;
      }
    };
    fetchFriendsData();
  }, [frdPgNum]);

  const RemoveFriend = (id: number) => {
    const updatedFriendsList = friendsData.filter(
      (friend) => friend.requestId != id
    );
    setFriendsData(updatedFriendsList);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          flex: "1",
          width: "100%",
          maxHeight: "100vh",
          overflow: "scroll",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        {friendsData.map((friend) => (
          <YourFriendsItem
            reference={lastFriendsData}
            key={friend.requestId}
            friendRequestData={friend}
            requestType={friend.requestType}
            OnRemoveFriend={RemoveFriend}
          />
        ))}

        {loadingFriend && (
          <Grid
            sx={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SuggestLoader />
          </Grid>
        )}
      </Box>
    </React.Fragment>
  );
};

export default ProfileFriends;
