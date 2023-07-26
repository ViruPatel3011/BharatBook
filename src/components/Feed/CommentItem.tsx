import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import UserContext from "../../Context/UserContext";
import { IComment } from "../../Models/Comment";
import { getAvatarImage } from "../../Services/AllApiRequests/Account";
import { DeleteComment } from "../../Services/AllApiRequests/SocialActivity";

interface CommentItemProps {
  comment: IComment;
  reference?: any;
  // OnDeleteComment: any;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  reference,
  // OnDeleteComment,
}) => {
  const { userData } = useContext(UserContext);
  const [userAvtar, setUserAvatar] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchCommentAvtar = async () => {
      try {
        const avatarImage = await getAvatarImage(comment.avatar);
        if (avatarImage) {
          setUserAvatar(avatarImage);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (comment.avatar) {
      fetchCommentAvtar();
    }
  }, [comment.avatar]);

  const handleDeleteComment = async () => {
    try {
      await DeleteComment(comment.commentId);
      // OnDeleteComment(comment.commentId);
    } catch (err) {
      throw err;
    }
  };

  return (
    <React.Fragment>
      <Card
        ref={reference}
        sx={{
          minWidth: 275,

          position: "relative",
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ display: "flex" }}>
          <Avatar src={`data:image/png;base64,${userAvtar}`} />
          <Box
            sx={{
              margin: "0 1rem",
              display: "flex",
              justifyContent: " space-between",
              width: "100%",
              border: "1px solid #cccccc",
              padding: "0.4rem",
              borderRadius: "10px",
            }}
          >
            <Box>
              <Typography sx={{ marginLeft: "0.3rem" }}>
                {comment.userName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  backgroundColor: "#eaeaea",
                  borderRadius: "15px",
                  padding: "0.2rem 0.7rem",
                }}
              >
                {comment.text}
              </Typography>
            </Box>
            {userData.userId === comment.userId && (
              <>
                <Button
                  sx={{ color: "black" }}
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreHorizIcon />
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
                  <MenuItem>
                    Delete
                    <CancelOutlinedIcon sx={{ margin: "0 0.5rem" }} />
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default CommentItem;
