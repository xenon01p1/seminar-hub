import { makeRequest } from "../axios";

export const getTotalAttendees = async() => {
    try {
        const { data } = await makeRequest.get('/admin/total-attendees/');
        return data.data;
    } catch (err) { 
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch Data.");
        }
        throw err;
    }
}