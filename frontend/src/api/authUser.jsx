// import axios from "axios";
import { makeRequest } from "../axios.js";

export const registerUser = async(data) => {
  const { data: response } = await makeRequest.post("/user/register", data);
  return response;
}

export const loginAuth = async(data) => {
    const { data: response } = await makeRequest.post("/user/login", data);
    return response;
}

export const logoutAuth = async () => {
  const { data } = await makeRequest.post("/user/logout", {}, { withCredentials: true });
  return data;
};

