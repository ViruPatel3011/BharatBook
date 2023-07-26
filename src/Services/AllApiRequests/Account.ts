import axiosInstance from "../request";
import { base64converter } from "../../Utils/helper";

//this Method is for User Login
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post(
      "/Account/Login",
      JSON.stringify(data)
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for Forgot Password
export const ForgotPass = async (Email: string) => {
  try {
    const forgotData = await axiosInstance.post(`/Account/Forgot`, Email);
    return forgotData.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for Verify Email Code
export const VerifyToken = async (Email: string, Token: string) => {
  try {
    const verifyTokenData = {
      email: Email,
      token: Token,
    };
    const verifyToken = await axiosInstance.post(
      `/Account/VerifyToken`,
      verifyTokenData
    );
    return verifyToken.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for Reset Password
export const ResetPass = async (
  Email: string,
  OldPassword: string,
  NewPassword: string
) => {
  try {
    const resetPassData = {
      email: Email,
      oldPassword: OldPassword,
      newPassword: NewPassword,
    };
    const resetpass = await axiosInstance.post(`/Account/Reset`, resetPassData);
    return resetpass.data;
  } catch (err) {
    throw err;
  }
};

// this method is for get  Story Image for User
export const getStoriesImages = async (storyPath: string) => {
  try {
    const getPost = await axiosInstance.get(`/Account/Story/${storyPath}`, {
      responseType: "blob",
    });

    const blobData = getPost.data;
    const base64String = await base64converter(blobData);
    return base64String;
  } catch (e) {
    console.log(e);
  }
};

//this Method is for get User Avatar
export const getAvatarImage = async (imageName: string) => {
  try {
    const response = await axiosInstance.get(`/Account/Avatar/${imageName}`, {
      responseType: "blob",
      withCredentials: false,
    });

    const blobData = response.data;
    const base64String = await base64converter(blobData);

    return base64String;
  } catch (err) {
    console.log("Error is ", err);
  }
};

// this method is for get  post Image for User
export const getPostFromPostId = async (postPath: string) => {
  try {
    // const trimmedPath = postPath.trim(); // Trim the extra spaces from postPath
    const getPost = await axiosInstance.get(`/Account/Post/${postPath}`, {
      responseType: "blob",
    });

    const blobData = getPost.data;
    const base64String = await base64converter(blobData);
    return base64String;
  } catch (e) {
    console.log(e);
  }
};
