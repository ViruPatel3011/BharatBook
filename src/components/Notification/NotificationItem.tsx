import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { NotificationType } from "../../Utils/const";
import { INotification } from "../../Models/Notification";
import { UserRequest } from "../../Services/AllApiRequests/UserRequest";
import moment from "moment";
import {
  ReadNotification,
  ClearSingleNotification,
} from "../../Services/AllApiRequests/Notification";
import {
  getCommentNotifById,
  getPostLikeNotif,
  getNewPostNotif,
} from "../../Services/AllApiRequests/SocialActivity";
import { storyNotif } from "../../Services/AllApiRequests/Story";
import {
  getAvatarImage,
  getPostFromPostId,
} from "../../Services/AllApiRequests/Account";

interface NotificationProps {
  notification: INotification;
  onCancelNotification: any;
  reference?: any;
}
const NotificationItem: React.FC<NotificationProps> = ({
  notification,
  onCancelNotification,
  reference,
}) => {
  const [username, SetUserName] = useState<string>("");
  const [userAvtar, SetUserAvtar] = useState<string>("");
  const [isRead, setIsRead] = useState<boolean>(false);
  const [postMedia, setPostMedia] = useState<string | undefined>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRead = async () => {
    try {
      await ReadNotification(notification.notificationId);
      setIsRead(true);
    } catch (err) {
      throw err;
    }
  };

  const handleClearNotif = async () => {
    try {
      await ClearSingleNotification(notification.notificationId);
      onCancelNotification(notification.notificationId);
    } catch (err) {
      throw err;
    }
  };

  const NotifMessageStyle = {
    fontSize: ["0.8rem", "1rem"],
  };

  const getTimeDifference = () => {
    const currentTime = moment();
    const createdAt = moment(notification.createdAt);
    const duration = moment.duration(currentTime.diff(createdAt));
    const minutes = duration.asMinutes();

    if (minutes < 1) {
      const seconds = duration.asSeconds();
      return `${Math.round(seconds)}s`;
    } else if (minutes < 60) {
      return `${Math.round(minutes)}m`;
    } else if (minutes < 1440) {
      return `${Math.round(minutes / 60)}h`;
    } else {
      return `${Math.round(minutes / 1440)}d`;
    }
  };

  const [timeDifference, setTimeDifference] = useState(getTimeDifference());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDifference(getTimeDifference());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getAvatarForUser = async (avatar: string) => {
    if (avatar) {
      const userImage = await getAvatarImage(avatar);
      if (userImage) {
        SetUserAvtar(userImage);
      }
    }
  };

  const getPostForNotif = async (path: string) => {
    if (path.length > 0) {
      const PostImage = await getPostFromPostId(path);
      setPostMedia(PostImage);
    }
  };

  const UserDataAndAvtar = async () => {
    switch (notification.activityType) {
      case NotificationType.COMMENT:
        try {
          const getNotifData = await getCommentNotifById(
            notification.activityId
          );
          const getPostData = await getNewPostNotif(getNotifData.postId);

          getPostForNotif(getPostData.path);
          SetUserName(getNotifData.userName);
          const userImage = await getAvatarImage(getNotifData.avatar);
          if (userImage) {
            SetUserAvtar(userImage);
          }
        } catch (error) {
          console.log(error);
        }
        break;

      case NotificationType.POST_LIKE:
        try {
          const getLikeNotif = await getPostLikeNotif(notification.activityId);
          const getPostData = await getNewPostNotif(getLikeNotif.postId);

          getPostForNotif(getPostData.path);

          getAvatarForUser(getLikeNotif.avatar);
          SetUserName(getLikeNotif.userName);
        } catch (error) {
          console.log(error);
        }
        break;

      case NotificationType.ADD_NEWPOST:
        try {
          const getNotifNewPost = await getNewPostNotif(
            notification.activityId
          );
          const getPostData = await getNewPostNotif(getNotifNewPost.postId);

          getPostForNotif(getPostData.path);

          SetUserName(getNotifNewPost.userName);
          getAvatarForUser(getNotifNewPost.avatar);
        } catch (e) {
          console.log(e);
        }
        break;

      case NotificationType.SEND_REQUEST:
        try {
          const SendRequestData = await UserRequest(notification.activityId);
          SetUserName(SendRequestData.fromUserName);
          if (SendRequestData.fromAvatar) {
            getAvatarForUser(SendRequestData.fromAvatar);
          }
        } catch (err) {
          throw err;
        }
        break;

      case NotificationType.ACCEPT_REQUEST:
        try {
          const AcceptRequest = await UserRequest(notification.activityId);
          SetUserName(AcceptRequest.toUserName);

          getAvatarForUser(AcceptRequest.toAvatar);
        } catch (err) {
          throw err;
        }
        break;

      case NotificationType.REJECT_REQUEST:
        try {
          const Rejectrequest = await UserRequest(notification.activityId);
          SetUserName(Rejectrequest.toUserName);
          getAvatarForUser(Rejectrequest.toAvatar);
        } catch (err) {
          throw err;
        }
        break;

      case NotificationType.ADD_NEWSTORY:
        try {
          const addStory = await storyNotif(notification.activityId);
          SetUserName(addStory.userName);
          if (addStory.avatar) {
            getAvatarForUser(addStory.avatar);
          }
        } catch (err) {
          throw err;
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setIsRead(notification.isRead);
    if (notification.activityId) {
      UserDataAndAvtar();
    }
  }, [notification.activityType, notification.activityId]);

  return (
    <React.Fragment>
      <Box
        ref={reference}
        sx={{
          backgroundColor: isRead ? "white" : "#e4efef",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: ["0.5rem", "1rem"],
            cursor: "pointer",
          }}
        >
          <Avatar
            sx={{ margin: ["0 0.5rem", "0 1rem"] }}
            src={`data:image/png;base64,${userAvtar}`}
          />
          {notification.activityType === NotificationType.COMMENT ? (
            <Typography sx={NotifMessageStyle}>
              {username} commented on your post
            </Typography>
          ) : notification.activityType === NotificationType.POST_LIKE ? (
            <Typography sx={NotifMessageStyle}>
              {username} liked your post
            </Typography>
          ) : notification.activityType === NotificationType.ADD_NEWPOST ? (
            <Typography sx={NotifMessageStyle}>
              {username} Add new post{" "}
            </Typography>
          ) : notification.activityType === NotificationType.SEND_REQUEST ? (
            <Typography sx={NotifMessageStyle}>
              {username} Send you a friend Request{" "}
            </Typography>
          ) : notification.activityType === NotificationType.ACCEPT_REQUEST ? (
            <Typography sx={NotifMessageStyle}>
              {username} Accept your friend Request{" "}
            </Typography>
          ) : notification.activityType === NotificationType.REJECT_REQUEST ? (
            <Typography sx={NotifMessageStyle}>
              {username} Reject your friend Request{" "}
            </Typography>
          ) : notification.activityType === NotificationType.ADD_NEWSTORY ? (
            <Typography sx={NotifMessageStyle}>
              {username} Add New Story
            </Typography>
          ) : null}

          {notification.activityType !== NotificationType.SEND_REQUEST &&
          notification.activityType !== NotificationType.ACCEPT_REQUEST &&
          notification.activityType !== NotificationType.REJECT_REQUEST &&
          notification.activityType !== NotificationType.ADD_NEWSTORY ? (
            <Avatar
              sx={{
                marginLeft: "1rem",
                borderRadius: "10px",
                width: "45px",
                height: "45px",
                display: ["none", "block"],
              }}
              src={`data:image/png;base64,${postMedia}`}
            />
          ) : null}
          <Typography sx={{ margin: ["0rem", "auto 1rem"], color: "gray" }}>
            {timeDifference}
          </Typography>
        </Box>
        <Box sx={{ margin: "auto 1rem" }}>
          <Button
            sx={{ color: "black" }}
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon sx={{ display: ["none", "block"] }} />
            <MoreVertIcon sx={{ display: ["block", "none"] }} />
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {!isRead ? (
              <MenuItem onClick={handleRead}>
                Read
                <RemoveRedEyeOutlinedIcon sx={{ margin: "0 0.5rem" }} />
              </MenuItem>
            ) : null}

            <MenuItem onClick={handleClearNotif}>
              Clear <CancelOutlinedIcon sx={{ margin: "0 0.5rem" }} />
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default NotificationItem;
