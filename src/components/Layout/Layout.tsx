import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getUserData } from "../../Services/AllApiRequests/User";
import { getAvatarImage } from "../../Services/AllApiRequests/Account";
import UserContext from "../../Context/UserContext";
import { getNotifWithPagination } from "../../Services/AllApiRequests/Notification";

const Layout: React.FC = () => {
  const { userData, setNotificationCount, setUserData, setUserAvatar } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("access_token") ?? "");
        const userId = userData.userId;

        const data = await getUserData(parseInt(userId));
        setUserData(data);
      } catch (e) {
        console.log("Error fetching user data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.avatar) {
      const imageData = async () => {
        try {
          const userAvtarData = await getAvatarImage(userData.avatar);
          const imgUrl = `data:image/png;base64, ${userAvtarData}`;
          setUserAvatar(imgUrl);
        } catch (e) {
          console.log("Error fetching image data:", e);
        }
      };
      imageData();
    }
  }, [userData]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const fetchNotif = await getNotifWithPagination(1, 100);
        setNotificationCount(fetchNotif.totalCount);
      } catch (e) {
        console.log(e);
      }
    };
    if (userData.userId) {
      fetchNotification();
    }
  }, [userData.userId]);

  return (
    <React.Fragment>
      {/* <UserContext.Provider value={{ userData, userAvatar, notificationCount }}> */}
      <Outlet />
      {/* </UserContext.Provider> */}
    </React.Fragment>
  );
};

export default Layout;
