import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "https://9bf2-14-99-103-154.ngrok-free.app";

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 3600000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
  withCredentials: false,
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use((config) => {
  const userDetails = JSON.parse(localStorage.getItem("access_token") ?? "[]");
  const authToken = userDetails ? userDetails.accessToken : "";
  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

export default axiosInstance;

export interface UserData {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  phoneNumber: BigInt;
  address: string | null;
  avatar?: string | null;
  profileText: string;
  cityId: number;
  countryId: number;
  birthDate: string;
  userProfile: string | null;
}
