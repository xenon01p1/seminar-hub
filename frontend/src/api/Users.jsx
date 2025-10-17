import { makeRequest } from "../axios.js";

export const getUsers = async () => {
    try {
        const { data } = await makeRequest.get('/admin/users');
        return data.data;
    } catch (err) { 
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch Data.");
        }
        throw err;
    }
}

export const getTotalUsers = async () => {
    try {
        const { data } = await makeRequest.get('/admin/total-users');
        return data.data;
    } catch (err) { 
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch Data.");
        }
        throw err;
    }
}

export const addUser = async (data) => {
    try {
        const { data: response } = await makeRequest.post("/admin/users", data);
        return response.data;
    } catch (err) {
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch users.");
        }
        throw err;
    }
}

export const editUser = async (id, data) => {
    try{
        const { data: response } = await makeRequest.patch(`/admin/users/${ id }`, data);
        return response;
    } catch (error) {
        if (err.response) {
            throw new Error(err.response.data.message || "Failed to fetch users.");
        }
        throw err;
    }
}


