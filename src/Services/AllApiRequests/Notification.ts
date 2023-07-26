import axiosInstance from "../request";

//Below post Method is for Notification using Pagination

export const getNotifWithPagination = async (
  PageNumber: number,
  PageSize: number
) => {
  try {
    const PaginationData = {
      pageNumber: PageNumber,
      pageSize: PageSize,
    };
    const responseNotif = await axiosInstance.post(
      `/Notification`,
      PaginationData
    );
    return responseNotif.data;
  } catch (e) {
    console.log(e);
  }
};

//Below method is for Read Notification
export const ReadNotification = async (NotificationId: number) => {
  try {
    const readNotif = await axiosInstance.post(
      `/Notification/Read/${NotificationId}`
    );
    return readNotif.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for clear single Notification
export const ClearSingleNotification = async (NotificationId: number) => {
  try {
    const clearSingleNotif = await axiosInstance.get(
      `/Notification/Clear/${NotificationId}`
    );
    return clearSingleNotif.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for clear All Notification

export const ClearAllNotif = async () => {
  try {
    const clearAllNotif = await axiosInstance.get(`/Notification/ClearAll`);
    return clearAllNotif.data;
  } catch (err) {
    throw err;
  }
};
