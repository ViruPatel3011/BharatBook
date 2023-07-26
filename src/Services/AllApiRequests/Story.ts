import axiosInstance from "../request";

//Below method is for Get Story for User
export const getUserStories = async (PageNumber: number, PageSize: number) => {
  try {
    const storyData = {
      pageNumber: PageNumber,
      pageSize: PageSize,
    };
    const getStories = await axiosInstance.post(
      `/Story/GetByUserId`,
      storyData
    );
    return getStories.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for Add New Story
export const addNewStory = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/Story/Add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for get Story Notification
export const storyNotif = async (storyId: number) => {
  try {
    const stNotif = await axiosInstance.get(`/Story/GetById/${storyId}`);
    return stNotif.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for Seen Story
export const StorySeen = async (storyId: number) => {
  try {
    const response = await axiosInstance.post(`/Story/Seen/${storyId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for Views On Story
export const StoryViews = async (
  PageNumber: number,
  PageSize: number,
  StoryId: number
) => {
  try {
    const ViewsData = {
      pageNumber: PageNumber,
      pageSize: PageSize,
      storyId: StoryId,
    };
    const Views = await axiosInstance.post(`/Story/Views`, ViewsData);
    return Views.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for delete User Story
export const DeleteStory = async (storyId: number) => {
  try {
    const deleteStory = await axiosInstance.post(`/Story/Delete/${storyId}`);
    return deleteStory.data;
  } catch (err) {
    throw err;
  }
};

