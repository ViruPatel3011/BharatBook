import axiosInstance from "../request";
import { IRegister } from "../../Utils/params";

//this Method is for get User Data
export const getUserData = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/User/GetById/${id}`);
    const userData = response.data;
    return userData;
  } catch (err) {
    throw err;
  }
};

//Below method is for Register New User
export const RegistrationForUser = async (registrationData: IRegister) => {
  try {
    const response = await axiosInstance.post(
      `/User/Upsert`,
      registrationData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

//Below Method is for Get Mutual Friends for User
export const getMutualFriends = async (
  PageNumber: number,
  PageSize: number,
  UserId: number
) => {
  try {
    const mutualFriendsData = {
      pageNumber: PageNumber,
      pageSize: PageSize,
      userId: UserId,
    };
    const response = await axiosInstance.post(
      `/User/Mutual`,
      mutualFriendsData
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
//Below method is for Getting suggestions for User
export const SuggestionForUser = async (
  PageNumber: number,
  PageSize: number
) => {
  try {
    const suggestions = {
      pageNumber: PageNumber,
      pageSize: PageSize,
    };
    const response = await axiosInstance.post(`/User/Suggestion`, suggestions);
    return response.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for get countries List for User
export const CountriesList = async (PageNumber: number, PageSize: number) => {
  try {
    const country = {
      pageNumber: PageNumber,
      pageSize: PageSize,
    };
    const countries = await axiosInstance.post(`/User/CountryList`, country);

    return countries.data;
  } catch (err) {
    throw err;
  }
};

//Below method is for get countries List for User
export const CitiesList = async (PageNumber: number, PageSize: number) => {
  try {
    const city = {
      pageNumber: PageNumber,
      pageSize: PageSize,
    };
    const cities = await axiosInstance.post(`/User/CityList`, city);
    return cities.data;
  } catch (err) {
    throw err;
  }
};
