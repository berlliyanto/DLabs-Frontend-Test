/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/config/axiosInstance";
import toast from "react-hot-toast";


export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.data);
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    return error.response;
  }
};
