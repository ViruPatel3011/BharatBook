import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface POstLikeCommProps {
  PostLikeCount: number;
  CommentCount: number;
}

const LikesAndCommentCount: React.FC<POstLikeCommProps> = (props) => {
  const{PostLikeCount,CommentCount}=props
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#d7f3fc",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", margin: "0.3rem" }}>
          <ThumbUpIcon sx={{ color: "#2e81f4", fontSize: "1.2rem" }} />
          <Typography sx={{ fontSize: "0.8rem", marginLeft: "0.2rem" }}>
            {PostLikeCount}
          </Typography>
        </Box>
        {CommentCount} Comments
      </Box>
    </React.Fragment>
  );
};

export default LikesAndCommentCount;
