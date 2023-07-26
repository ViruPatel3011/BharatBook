import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import NotificationItem from "./NotificationItem";
import UserContext from "../../Context/UserContext";
import { INotification } from "../../Models/Notification";
import {
  getNotifWithPagination,
  ClearAllNotif,
} from "../../Services/AllApiRequests/Notification";
import PostLoaders from "../Loaders/Loaders";
import useLastItemObserver from "../../Utils/helper";

const Notification: React.FC = () => {
  const { userData, setNotificationCount } = useContext(UserContext);
  const [allNotification, setAllNotification] = useState<INotification[]>([]);
  const [loadingNotif, setLoadingNotif] = useState<boolean>(true);
  const [notifPageNumber, setNotifPageNumber] = useState<number>(1);
  const [hasNotifMore, setHasNotifMore] = useState<boolean>(false);

  const bigBoxStyle = {
    flex: "1",
    boxShadow: "0px 5px 10px -7px rgba(0, 0, 0, 0.75)",
    width: "55%",
    maxHeight: "100vh",
    overflow: "scroll",
    backgroundColor: "#f0f2f5",
  };

  const innerBoxstyle = {
    borderRadius: "10px",
    width: "90%",
    backgroundColor: "white",
    margin: "1rem",
    padding: "0.5rem",
  };

  const lastNotif = useLastItemObserver(
    loadingNotif,
    hasNotifMore,
    setNotifPageNumber
  );
  useEffect(() => {
    const getAllNotification = async () => {
      try {
        const notificationData = await getNotifWithPagination(
          notifPageNumber,
          10
        );
        if (notificationData) {
          setAllNotification((prevNotif) => [
            ...prevNotif,
            ...notificationData.records,
          ]);
          setHasNotifMore(notificationData.records.length > 0);
          setLoadingNotif(false);
        }
      } catch (err) {
        throw err;
      }
    };
    if (userData) {
      getAllNotification();
    }
  }, [userData, notifPageNumber]);

  const RemoveNotification = (id: number) => {
    const updatedNotifList = allNotification.filter(
      (notification) => notification.notificationId != id
    );
    setAllNotification(updatedNotifList);
    setNotificationCount(updatedNotifList.length);
  };

  const clearAllNotification = async () => {
    try {
      await ClearAllNotif();
      setAllNotification([]);
      setNotificationCount(0);
    } catch (err) {
      throw err;
    }
  };

  return (
    <React.Fragment>
      <Box sx={bigBoxStyle}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ margin: "1rem", fontSize: "1.5rem", fontWeight: "bold" }}
          >
            Notifications
          </Typography>

          {allNotification && allNotification.length > 0 && (
            <Button
              sx={{ textTransform: "none", margin: "auto 1rem" }}
              disableRipple
              onClick={clearAllNotification}
            >
              <Typography
                sx={{
                  background: "#fff",
                  padding: "0.1rem",
                  border: "1px solid black",
                  borderRadius: "5px",
                  color: "black",
                }}
              >
                Clear All
              </Typography>
            </Button>
          )}
        </Box>
        <Box sx={innerBoxstyle}>
          {allNotification.length > 0 ? (
            allNotification.map((notification, index) => {
              if (allNotification.length === index + 1) {
                return (
                  <Box
                    key={notification.notificationId}
                    sx={{
                      margin: "1rem",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                  >
                    <NotificationItem
                      reference={lastNotif}
                      notification={notification}
                      onCancelNotification={RemoveNotification}
                    />
                  </Box>
                );
              } else {
                return (
                  <Box
                    key={notification.notificationId}
                    sx={{
                      margin: "1rem",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                  >
                    <NotificationItem
                      notification={notification}
                      onCancelNotification={RemoveNotification}
                    />
                  </Box>
                );
              }
            })
          ) : (
            <Typography sx={{ color: "gray", fontSize: "1.3rem" }}>
              No data available
            </Typography>
          )}
          {loadingNotif && <PostLoaders />}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Notification;
