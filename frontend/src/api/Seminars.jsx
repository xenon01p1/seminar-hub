import { makeRequest, publicRequest } from "../axios";

export const getSeminars = async() => {
    try {
        const { data } = await publicRequest.get('/user/seminars/');
        return data.data;
    } catch (err) { 
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch Data.");
        }
        throw err;
    }
}

export const getSeminarsForAdmin = async() => {
    try {
        const { data } = await publicRequest.get('/admin/seminars/');
        return data.data;
    } catch (err) { 
        if (err.response) {
            console.log(err.response.data.message);
            throw new Error(err.response.data.message || "Failed to fetch Data.");
        }
        throw err;
    }
}

export const getSeminarsJoined = async(id) => {
    try {
        const { data } = await makeRequest.get(`/user/get-seminars-join/${ id }`);
        return data.data;
    } catch (err) { 
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch Data.");
        }
        throw err;
    }
}

export const getTotalSeminars = async() => {
    try {
        const { data } = await makeRequest.get('/admin/total-seminars/');
        return data.data;
    } catch (err) { 
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch Data.");
        }
        throw err;
    }
}

export const addSeminar = async (data) => {
    try {
        const { data: response } = await makeRequest.post("/admin/seminars", data);
        return response.data;
    } catch (err) {
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch seminars.");
        }
        throw err;
    }
}

export const editSeminar = async (id, data) => {
    try{
        const { data: response } = await makeRequest.patch(`/admin/seminars/${ id }`, data);
        return response;
    } catch (error) {
        if (err.response) {
            throw new Error(err.response.data.message || "Failed to fetch seminars.");
        }
        throw err;
    }
}

export const deleteSeminar = async (id) => {
    try{
        const { data: response } = await makeRequest.delete(`/admin/seminars/${ id }`);
        return response;
    } catch (error) {
        if (err.response) {
            throw new Error(err.response.data.message || "Failed to fetch seminars.");
        }
        throw err;
    }
} 