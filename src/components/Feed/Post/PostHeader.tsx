import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Avatar,
  Button,
  Fade,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import UserContext from "../../../Context/UserContext";
import { getAvatarImage } from "../../../Services/AllApiRequests/Account";

interface PostHeaderProps {
  userPostAvatar: string;
  postUserId: number;
  postUserName: string;
  postText: string;
  postId: number;
  dateForPost: string;
  deletePostofUser: (id: number) => void;
  handleRemoveUPost: (id: number) => void;
}
const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const {
    userPostAvatar,
    postUserId,
    postUserName,
    postText,
    postId,
    dateForPost,
    deletePostofUser,
    handleRemoveUPost,
  } = props;
  const { userData } = useContext(UserContext);
  const [userPic, setUserPic] = useState<string | undefined>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        if (userPostAvatar) {
          const avatarImage = await getAvatarImage(userPostAvatar);
          setUserPic(avatarImage);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserAvatar();
  }, [userPostAvatar]);

  return (
    <React.Fragment>
      <CardHeader
        sx={{ backgroundColor: "#ebebeb" }}
        avatar={<Avatar src={`data:image/jpg;base64,${userPic}`}></Avatar>}
        action={
          <>
            {userData.userId === postUserId && (
              <>
                <Button
                  sx={{ color: "black" }}
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon sx={{ color: "gray" }} />
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
                  <MenuItem onClick={() => deletePostofUser(postId)}>
                    Delete <DeleteIcon />
                  </MenuItem>
                </Menu>
              </>
            )}
            <Button onClick={() => handleRemoveUPost(postId)}>
              <ClearIcon sx={{ fontSize: "2rem", color: "gray" }} />
            </Button>
          </>
        }
        title={postUserName}
        subheader={dateForPost}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: ["none", "flex", "flex"] }}
        >
          {postText}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
};

export default PostHeader;
