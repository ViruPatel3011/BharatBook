import React, { useState, useContext, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import UserContext from "../../../Context/UserContext";
import PostHeader from "./PostHeader";
import PostMedias from "./PostMedias";
import LikesAndCommentCount from "./LikesAndCommentCount";
import LikesCommentShare from "./LikesCommentShare";
import { IComment } from "../../../Models/Comment";
import { IPost } from "../../../Models/PostC";
import useLastItemObserver from "../../../Utils/helper";
import {
  addComments,
  getCommentsForUser,
  getLikesForPost,
  PostLike,
  DeletePost,
} from "../../../Services/AllApiRequests/SocialActivity";
import { getPostFromPostId } from "../../../Services/AllApiRequests/Account";

interface PostProps {
  post: IPost;
  reference?: any;
  onRemovePost: any;
  onCancelPost: any;
}

const Post: React.FC<PostProps> = ({
  post,
  reference,
  onRemovePost,
  onCancelPost,
}) => {
  const { userData } = useContext(UserContext);
  const observerComm = useRef<IntersectionObserver | null>(null);
  const [isLiked, setIsLiked] = useState<Boolean>(false);
  const [postImages, setPostImages] = useState<(string | undefined)[]>([]);
  const [userComments, setUserComments] = useState<IComment[]>([]);
  const [postLikes, setPostLikes] = useState<string>("");
  const [loadingComm, setLoadingComm] = useState<boolean>(true);
  const [commentPageNumber, setCommentPageNumber] = useState<number>(1);
  const [hasMoreComm, setHasMoreComm] = useState<boolean>(false);
  const [commCount, setCommCount] = useState<number>(0);

  const lastComment = useLastItemObserver(
    loadingComm,
    hasMoreComm,
    setCommentPageNumber
  );

  useEffect(() => {
    const fetchPostImages = async () => {
      const postImagePromises = await post.path.map((imageName) => {
        const imageUrl = getPostFromPostId(imageName);
        return imageUrl;
      });
      try {
        const imageData = await Promise.all(postImagePromises);
        setPostImages(imageData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostImages();
  }, [post.postId]);

  useEffect(() => {
    setLoadingComm(true);
    const fetchComments = async () => {
      const commenData = {
        pageNumber: commentPageNumber,
        pageSize: 5,
        postId: post.postId,
      };
      try {
        const comments = await getCommentsForUser(commenData);
        setUserComments((prevComments) => [
          ...prevComments,
          ...comments.record.responseModel,
        ]);

        setHasMoreComm(comments.record.responseModel.length > 0);
        setLoadingComm(false);

        setCommCount(comments.totalCount);
      } catch (e) {
        console.log(e);
      }
    };
    fetchComments();
  }, [commentPageNumber]);

  useEffect(() => {
    const fetchAllLikes = async () => {
      try {
        const totalLikesOnPost = await getLikesForPost(post.postId);
        setPostLikes(totalLikesOnPost);

        const loginUserLiked = totalLikesOnPost.some(
          (like: { userId: number }) => like.userId === userData.userId
        );
        setIsLiked(loginUserLiked);
      } catch (e) {
        console.log(e);
      }
    };
    if (post.postId > 0) {
      fetchAllLikes();
    }
  }, [isLiked]);

  const handleLikeClick = async () => {
    if (isLiked) {
      const isLike = false;
      const response = await PostLike(userData.userId, post.postId, isLike);
      setIsLiked(response);
    } else {
      const isLike = true;
      const response = await PostLike(userData.userId, post.postId, isLike);
      setIsLiked(response);
    }
  };

  const deleteUserPost = async (postId: number) => {
    try {
      await DeletePost(postId);
      onCancelPost(postId);
    } catch (err) {
      throw err;
    }
  };
  const handleRemovePost = (postId: number) => {
    try {
      onRemovePost(postId);
    } catch (err) {
      throw err;
    }
  };

  const RemoveComment = (id: number) => {
    const UpdatedComment = userComments.filter(
      (commentU) => commentU.commentId != id
    );
    setUserComments(UpdatedComment);
  };

  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <React.Fragment>
      <Card
        sx={{ width: ["90%", "75%", "80%", "60%"], margin: "2rem auto" }}
        ref={reference}
      >
        <PostHeader
          userPostAvatar={post.avatar}
          postUserId={post.userId}
          postUserName={post.userName}
          postText={post.text}
          postId={post.postId}
          dateForPost={formattedDate}
          deletePostofUser={deleteUserPost}
          handleRemoveUPost={handleRemovePost}
        />

        <PostMedias medias={postImages} postPath={post.path} />

        <LikesAndCommentCount
          PostLikeCount={postLikes.length}
          CommentCount={commCount}
        />

        <LikesCommentShare
          Liked={isLiked}
          UserId={userData.userId}
          postid={post.postId}
          PostCommentList={userComments}
          handlePostLike={handleLikeClick}
          handleSetComment={setUserComments}
          handleCommentCount={setCommCount}
          LastComment={lastComment}
        />
      </Card>
    </React.Fragment>
  );
};

export default Post;
