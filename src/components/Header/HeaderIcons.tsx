import React, { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PeopleIcon from "@mui/icons-material/People";
import Page from "../../Utils/route";
import { getNotifWithPagination } from "../../Services/AllApiRequests/Notification";
import UserContext from "../../Context/UserContext";

// import FlagIcon from "@mui/icons-material/Flag";
// import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

const commonButtonStyles = {
  color: "gray",
  margin: { xs: "0rem 0.3rem", sm: "0rem 0.3rem", xl: "0.5rem 1rem" },
  padding: { xs: "0.5rem 0.5rem", sm: "0.5rem 0.5rem", xl: "1rem 1rem" },
  "&:hover": {
    color: "#2e81f4",
  },
};
// Below code is for Active effect on HeaderIcons
const activeButtonStyles = {
  borderBottom: "3px solid #2e81f4",
  color: "#2e81f4",
};

const HeaderIcons: React.FC = () => {
  const { notificationCount } = useContext(UserContext);
  const location = useLocation();

  return (
    <React.Fragment>
      <Tooltip title="Home">
        <Button
          sx={{
            ...commonButtonStyles,
            ...(location.pathname === Page.HOME_PAGE ? activeButtonStyles : {}),
          }}
          component={Link}
          to={Page.HOME_PAGE}
        >
          <HomeIcon sx={{ fontSize: "2rem" }} />
        </Button>
      </Tooltip>
      <Tooltip title="Friends">
        <Button
          sx={{
            ...commonButtonStyles,
            ...(location.pathname === Page.FRIENDS_PAGE
              ? activeButtonStyles
              : {}),
          }}
          component={Link}
          to={Page.FRIENDS_PAGE}
        >
          <PeopleIcon sx={{ fontSize: "2rem" }} />
        </Button>
      </Tooltip>
      <Tooltip title="Notifications">
        <Button
          sx={{
            ...commonButtonStyles,
            ...(location.pathname === Page.NOTIFICATION_PAGE
              ? activeButtonStyles
              : {}),
          }}
          component={Link}
          to={Page.NOTIFICATION_PAGE}
        >
          {notificationCount ? (
            <Badge badgeContent={notificationCount} color="error">
             
              <NotificationsActiveIcon sx={{ fontSize: "2rem" }} />
            </Badge>
          ) : (
            <NotificationsActiveIcon sx={{ fontSize: "2rem" }} />
          )}
        </Button>
      </Tooltip>

      {/* <Tooltip title="Flag">
        <Button
          sx={{
            ...commonButtonStyles,
            ...(location.pathname === Page.FLAG_PAGE ? activeButtonStyles : {}),
          }}
          component={Link}
          to={Page.FLAG_PAGE}
        >
          <FlagIcon sx={{ fontSize: "2rem" }} />
        </Button>
      </Tooltip>
      <Tooltip title="Subscription">
        <Button
          sx={{
            ...commonButtonStyles,
            ...(location.pathname === Page.SUBSCRIPTION_PAGE
              ? activeButtonStyles
              : {}),
          }}
          component={Link}
          to={Page.SUBSCRIPTION_PAGE}
        >
          <SubscriptionsIcon sx={{ fontSize: "2rem" }} />
        </Button>
      </Tooltip>

      <Tooltip title="MarketPlace">
        <Button
          sx={{
            ...commonButtonStyles,
            ...(location.pathname === Page.MARKETPLACE_PAGE
              ? activeButtonStyles
              : {}),
          }}
          component={Link}
          to={Page.MARKETPLACE_PAGE}
        >
          <StorefrontIcon sx={{ fontSize: "2rem" }} />
        </Button>
      </Tooltip>

      <Tooltip title="Groups">
        <Button
          sx={{
            ...commonButtonStyles,
            ...(location.pathname === Page.GROUPS_PAGE
              ? activeButtonStyles
              : {}),
          }}
          component={Link}
          to={Page.GROUPS_PAGE}
        >
          <GroupsRoundedIcon sx={{ fontSize: "2rem" }} />
        </Button>
      </Tooltip> */}
    </React.Fragment>
  );
};

export default HeaderIcons;
