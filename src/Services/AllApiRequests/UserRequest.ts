import axiosInstance from "../request";

//Below method is for GetFriendList for User
export const getFriendListForUser = async (
  PageNumber: number,
  Pagesize: number,
  Filter: number,
  RequestType: number
) => {
  try {
    const requestData = {
      pageNumber: PageNumber,
      pageSize: Pagesize,
      filter: Filter,
      requestType: RequestType,
    };
    const response = await axiosInstance.post(
      `/UserRequest/GetByUserId`,
      requestData
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

// Below method is for Accpet or Reject Request of User
export const RequestReply = async (RequestId: number, IsAccepted: boolean) => {
  try {
    const requestResponse = {
      requestId: RequestId,
      isAccepted: IsAccepted,
    };
    const response = await axiosInstance.post(
      `/UserRequest/Respond`,
      requestResponse
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Below Method is for Get Notification for Friend-Request for User
export const UserRequest = async (requestId: number) => {
  try {
    const response = await axiosInstance.get(
      `/UserRequest/GetById/${requestId}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for send request to User
export const SendRequest = async (UserId: number) => {
  try {
    const sendUserReq = await axiosInstance.post(`/UserRequest/Send/${UserId}`);
    return sendUserReq.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for send request to User
export const CancleRequest = async (RequestId: number) => {
  try {
    const sendUserReq = await axiosInstance.post(
      `/UserRequest/CancleOrRemove/${RequestId}`
    );

    return sendUserReq.data;
  } catch (err) {
    throw err;
  }
};
