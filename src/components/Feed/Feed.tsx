import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import StoryReel from "./StoryReel";
import PostDescription from "./PostDescription";
import Post from "./Post/Post";
import PostLoaders from "../Loaders/Loaders";
import { IPost, PostClass } from "../../Models/PostC";
import useLastItemObserver from "../../Utils/helper";
import { getPostByUserId } from "../../Services/AllApiRequests/SocialActivity";

interface Post {
  postId: number;
  avatar: string;
  createdAt: string;
  path: string[];
  text: string;
  userId: number;
  userName: string;
}

const Feed: React.FC = () => {
  const [postData, setPostData] = useState<IPost[]>([]);
  const sentPostData = (post: IPost) => {
    setNewPost(post);
  };
  const [newPost, setNewPost] = useState<IPost>(new PostClass());
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPost = useLastItemObserver(loading, hasMore, setPageNumber);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const posts = await getPostByUserId(pageNumber, 4, false);
        if (posts) {
          setPostData((prevPosts) => [...prevPosts, ...posts.records]);
        }
        setHasMore(posts.records.length > 0);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [pageNumber]);

  useEffect(() => {
    if (newPost.postId) {
      setPostData((prevPostData) => [newPost, ...prevPostData]);
    }
  }, [newPost]);

  const RemovePost = (id: number) => {
    const UpdatedPosts = postData.filter((post) => post.postId != id);
    setPostData(UpdatedPosts);
  };

  const DeletePost = (id: number) => {
    const updatedPostData = postData.filter((post) => post.postId != id);
    setPostData(updatedPostData);
  };

  return (
    <Box
      sx={{
        flex: "1",
        boxShadow: "0px 5px 10px -7px rgba(0, 0, 0, 0.75)",
        width: "55%",
        maxHeight: "100vh",
        overflow: "scroll",
        backgroundColor: "#f0f2f5",
      }}
    >
      <StoryReel />
      <PostDescription onSharePostData={sentPostData} />

      {postData &&
        postData.map((post, index) => {
          if (postData.length === index + 1) {
            return (
              <Post
                reference={lastPost}
                key={post.postId}
                post={post}
                onRemovePost={RemovePost}
                onCancelPost={DeletePost}
              />
            );
          } else {
            return (
              <Post
                key={post.postId}
                post={post}
                onRemovePost={RemovePost}
                onCancelPost={DeletePost}
              />
            );
          }
        })}
      {loading && <PostLoaders />}
    </Box>
  );
};

export default Feed;
