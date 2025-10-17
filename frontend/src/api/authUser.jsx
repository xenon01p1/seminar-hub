// import axios from "axios";
import { makeRequest } from "../axios.js";

export const loginAuth = async(data) => {
    const { data: response } = await makeRequest.post("/user/login", data);
    return response;
}

