import React, { useState, useContext, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Page from "../../Utils/route";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
// import ChatIcon from "@mui/icons-material/Chat";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import Divider from "@mui/material/Divider";
// import Collapse from "@mui/material/Collapse";
// import GroupsIcon from "@mui/icons-material/Groups";
// import HistoryIcon from "@mui/icons-material/History";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import { getAvatarImage } from "../Services/AllAPIRequest";

interface SidebarItem {
  logo: React.ReactElement;
  title: string;
  route: string;
}

const data: SidebarItem[] = [
  { logo: <HomeIcon />, title: "Home", route: "/layout/home" },
  { logo: <PeopleIcon />, title: "Friends", route: "/layout/home/friends" },
  {
    logo: <NotificationsActiveIcon />,
    title: "Notification",
    route: "/layout/home/notification",
  },
  // {
  //   logo: <LocalHospitalIcon />,
  //   title: "Covid-19 Information Center",
  //   route: "/layout/home",
  // },
  // { logo: <EmojiFlagsIcon />, title: "Pages", route: "/layout/home/flag" },
  // { logo: <ChatIcon />, title: "Messenger", route: "/layout/home/messenger" },
  // {
  //   logo: <StorefrontIcon />,
  //   title: "Market Place",
  //   route: "/layout/home/marketplace",
  // },
  // {
  //   logo: <VideoLibraryIcon />,
  //   title: "Videos",
  //   route: "/layout/home/subscriptions",
  // },
];

const sidebarIconStyle = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f0f2f5",
  },
};

const activeButtonStyles = {
  color: "#2e81f4",
  backgroundColor: "#e8f4ff",
};
const activeButtonBackground = {
  color: "white",
  backgroundColor: "#2e81f4",
};

const SidebarIcons: React.FC = () => {
  const { userData, userAvatar } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  // const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = (): void => {
  //   setExpanded(!expanded);
  // };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div>
      <List
        sx={{
          width: ["auto", "auto", "100%"],
          padding: ["0.8rem 2rem", "1rem 2.7rem", "0rem"],
          // maxWidth: 460,
          bgcolor: "background.paper",
          marginTop: "10px",
          height: "100%",
        }}
      >
        <ListItem
          component={Link}
          to={Page.PROFILE_PAGE}
          sx={{
            ...sidebarIconStyle,
            ...(location.pathname === Page.PROFILE_PAGE
              ? activeButtonStyles
              : {}),
          }}
        >
          <ListItemAvatar>
            <Avatar src={userAvatar} />
          </ListItemAvatar>
          <ListItemText
            primary={userData.firstName + " " + userData.lastName}
            sx={{ fontWeight: "600 !important", color: "black" }}
          />
        </ListItem>
        {data.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            to={item.route}
            sx={{
              ...sidebarIconStyle,
              ...(location.pathname === item.route ? activeButtonStyles : {}),
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  ...(location.pathname === item.route
                    ? activeButtonBackground
                    : { color: "#2e81f4", backgroundColor: "#e3dede" }),
                }}
              >
                {item.logo}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              sx={{ fontWeight: "600 !important", color: "black" }}
            />
          </ListItem>
        ))}

        {/* <ListItem sx={sidebarIconStyle} onClick={handleExpandClick}>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "#e3dede" }}>
              {expanded ? (
                <ExpandLessIcon sx={{ color: "#2e81f4" }} />
              ) : (
                <ExpandMoreIcon sx={{ color: "#2e81f4" }} />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Expand More" />
        </ListItem>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              ...sidebarIconStyle,
              ...(location.pathname === Page.GROUPS_PAGE
                ? activeButtonStyles
                : {}),
              margin: "0 1.5rem",
              color: "black",
            }}
            component={Link}
            to="groups"
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  ...(location.pathname === Page.GROUPS_PAGE
                    ? activeButtonBackground
                    : { color: "#2e81f4", backgroundColor: "#e3dede" }),
                }}
              >
                <GroupsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Groups" />
          </ListItem>

          <ListItem
            sx={{
              ...sidebarIconStyle,
              ...(location.pathname === Page.MEMORIES_PAGE
                ? activeButtonStyles
                : {}),
              margin: "0 1.5rem",
              color: "black",
            }}
            component={Link}
            to="memories"
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  ...(location.pathname === Page.MEMORIES_PAGE
                    ? activeButtonBackground
                    : { color: "#2e81f4", backgroundColor: "#e3dede" }),
                }}
              >
                <HistoryIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Memories" />
          </ListItem>

          <ListItem
            sx={{
              ...sidebarIconStyle,
              ...(location.pathname === Page.SAVED_PAGE
                ? activeButtonStyles
                : {}),
              margin: "0 1.5rem",
              color: "black",
            }}
            component={Link}
            to="Saved"
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  ...(location.pathname === Page.SAVED_PAGE
                    ? activeButtonBackground
                    : { color: "#2e81f4", backgroundColor: "#e3dede" }),
                }}
              >
                <BookmarkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Saved" />
          </ListItem>
        </Collapse>
        <Divider /> */}

        <ListItem sx={sidebarIconStyle} onClick={handleLogout}>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "#e3dede" }}>
              <LogoutIcon sx={{ color: "#2e81f4" }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="LogOut" />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarIcons;
