import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CommentItem from "../CommentItem";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import { addComments } from "../../../Services/AllApiRequests/SocialActivity";
import { IComment } from "../../../Models/Comment";
import { REQUIRED_ERROR } from "../../../Utils/enums";

interface LikeComShareProps {
  Liked: Boolean;
  UserId: number;
  postid: number;
  PostCommentList: IComment[];
  LastComment: any;
  handleSetComment: React.Dispatch<React.SetStateAction<IComment[]>>;
  handleCommentCount: React.Dispatch<React.SetStateAction<number>>;
  handlePostLike: (UId: number, PId: number) => void;
}
const LikesCommentShare: React.FC<LikeComShareProps> = (props) => {
  const {
    Liked,
    UserId,
    postid,
    PostCommentList,
    LastComment,
    handleSetComment,
    handlePostLike,
    handleCommentCount,
  } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const hoverIcon = {
    "&:hover": {
      background: "transparent",
    },
  };

  const handleComment = async (): Promise<void> => {
    if (!comment) {
      setIsError(true);
      return;
    }

    try {
      setIsError(false);
      const response = await addComments(postid, comment);
      if (response) {
        handleSetComment((previouscmt) => [response, ...previouscmt]);
        handleCommentCount((prevCount) => prevCount + 1);
        setComment("");
      }
    } catch (err) {
      throw err;
    }
  };

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  const handleShareClick = (): void => {
    if (navigator.share) {
      navigator
        .share({
          title: "Share Post",
          text: "Check out this post!",
          url: "https://example.com/post",
        })
        .then(() => console.log("Shared successfully."))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Web Share API not supported.");
    }
  };

  return (
    <React.Fragment>
      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <IconButton
          disableRipple
          sx={{ ...hoverIcon, display: "flex" }}
          onClick={() => handlePostLike(UserId, postid)}
        >
          {Liked ? (
            <ThumbUpIcon sx={{ color: "#2e81f4" }} />
          ) : (
            <ThumbUpOutlinedIcon />
          )}
          <Typography
            sx={{ margin: "0 0.3rem", display: ["none", "flex", "flex"] }}
          >
            Like
          </Typography>
        </IconButton>
        <IconButton onClick={handleExpandClick} sx={hoverIcon} disableRipple>
          <CommentIcon />
          <Typography
            sx={{ margin: "0 0.3rem", display: ["none", "flex", "flex"] }}
          >
            Comment
          </Typography>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>

        <IconButton sx={hoverIcon} onClick={handleShareClick} disableRipple>
          <ShareIcon />
          <Typography
            sx={{ margin: "0 0.3rem", display: ["none", "flex", "flex"] }}
          >
            Share
          </Typography>
        </IconButton>
      </CardActions>
      <Box>
        <Collapse in={expanded}>
          <Box sx={{ maxHeight: "300px", overflowY: "scroll" }}>
            {PostCommentList.length > 0 ? (
              PostCommentList.map((comment, index) => {
                if (PostCommentList.length === index + 1) {
                  return (
                    <CommentItem
                      reference={LastComment}
                      key={comment.commentId}
                      comment={comment}
                      // OnDeleteComment={RemoveComment}
                    />
                  );
                } else {
                  return (
                    <CommentItem
                      key={comment.commentId}
                      comment={comment}
                      // OnDeleteComment={RemoveComment}
                    />
                  );
                }
              })
            ) : (
              <Typography
                sx={{ margin: " 0 1rem", fontStyle: "italic", color: "gray" }}
              >
                No Comments Yet ! Be the first !!
              </Typography>
            )}
          </Box>
          <TextField
            name="comment"
            label="Comment"
            variant="standard"
            sx={{
              width: "85%",
              margin: "1rem",
              position: "sticky",
              bottom: "1px",
              backgroundColor: "white",
            }}
            value={comment}
            error={isError}
            helperText={isError ? REQUIRED_ERROR.COMMENT_TEXT : ""}
            onChange={(e) => setComment(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="send comment"
                    edge="end"
                    onClick={() => handleComment()}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Collapse>
      </Box>
    </React.Fragment>
  );
};

export default LikesCommentShare;
