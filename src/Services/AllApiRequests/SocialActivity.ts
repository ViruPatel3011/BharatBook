import axiosInstance from "../request";

//this Method is for Add Post
export const addPost = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      "/SocialActivity/AddPost",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// This method is for Add Comments in post
export const addComments = async (PostId: number, Text: string) => {
  try {
    const commentData = { postId: PostId, text: Text };
    const response = await axiosInstance.post(
      "/SocialActivity/AddComment",
      commentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Failed to add comment:", e);
  }
};

// this method is for get Total post for User
export const getPostByUserId = async (
  PageNumber: number,
  PageSize: number,
  IsUser: boolean
) => {
  try {
    const params = {
      pageNumber: PageNumber,
      pageSize: PageSize,
      isUser: IsUser,
    };
    const getPostData = await axiosInstance.post(
      `/SocialActivity/PostByUserId`,
      params
    );
    return getPostData.data;
  } catch (error) {
    console.log(error);
  }
};

// below method is for getComment for User
export const getCommentsForUser = async (params) => {
  try {
    const response = await axiosInstance.post(
      "/SocialActivity/CommentByPostId",
      params
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

// Below method is for get Total Likes for Post
export const getLikesForPost = async (postId: number) => {
  try {
    const response = await axiosInstance.get(
      `/SocialActivity/LikeByPostId/${postId}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//Below method is for Like the post by User
export const PostLike = async (
  UserId: number,
  PostId: number,
  Islike: boolean
) => {
  try {
    const postLikeData = {
      userId: UserId,
      postId: PostId,
      isLike: Islike,
    };
    const response = await axiosInstance.post(
      `/SocialActivity/AddPostLike`,
      postLikeData
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//Below method is for get CommentOnPost Notification by id
export const getCommentNotifById = async (commentId: number) => {
  try {
    const response = await axiosInstance.get(
      `/SocialActivity/CommentById/${commentId}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//Below method is  for get PostLike Notification
export const getPostLikeNotif = async (postId: number) => {
  try {
    const response = await axiosInstance.get(
      `/SocialActivity/LikeById/${postId}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//Below method is for get NOtifForNewPost
export const getNewPostNotif = async (postId: number) => {
  try {
    const response = await axiosInstance.get(
      `/SocialActivity/PostById/${postId}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

// Below method is for Delete Post
export const DeletePost = async (postId: number) => {
  try {
    const deletePost = await axiosInstance.post(
      `/SocialActivity/DeletePost/${postId}`
    );
    return deletePost.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for Delete Comment
export const DeleteComment = async (commentId: number) => {
  try {
    const commentDelete = await axiosInstance.post(
      `/SocialActivity/DeleteComment/${commentId}`
    );
    return commentDelete.data;
  } catch (err) {
    throw err;
  }
};
