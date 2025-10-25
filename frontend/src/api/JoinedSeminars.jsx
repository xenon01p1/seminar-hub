import { makeRequest } from "../axios";

export const getTotalJoinedSeminars = async (id) => {
  try {
    const { data: response } = await makeRequest.get(`/user/total-seminars-joined/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch joined seminars.");
    }
    throw error;
  }
};