import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Post from "../../../../components/Feed/Post/Post";
import { IPost } from "../../../../Models/PostC";

interface PostProps {
  UserPostDetails: IPost[];
  RemoveUserPost: any;
  CancelUserPost: any;
  postReference?: any;
}

const ProfilePost: React.FC<PostProps> = (props) => {
  const { UserPostDetails, RemoveUserPost, CancelUserPost, postReference } =
    props;
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
        <Grid>
          {UserPostDetails.map((post) => (
            <Post
              reference={postReference}
              key={post.postId}
              post={post}
              onRemovePost={RemoveUserPost}
              onCancelPost={CancelUserPost}
            />
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default ProfilePost;
