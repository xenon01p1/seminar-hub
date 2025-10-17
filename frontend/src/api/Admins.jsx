import { makeRequest } from "../axios";

export const getAdmins = async () => {
    try {
        const { data } = await makeRequest.get("/admin/admins");
        return data.data;
    } catch (err) {
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch admins.");
        }
        throw err;
    }
}

export const addAdmin = async (data) => {
    try {
        const { data: response } = await makeRequest.post("/admin/admins", data);
        return response.data;
    } catch (err) {
        if (err.response) {
        throw new Error(err.response.data.message || "Failed to fetch admins.");
        }
        throw err;
    }
}

export const editAdmin = async (id, data) => {
    try{
        const { data: response } = await makeRequest.patch(`/admin/admins/${ id }`, data);
        return response;
    } catch (error) {
        if (err.response) {
            throw new Error(err.response.data.message || "Failed to fetch admins.");
        }
        throw err;
    }
}

export const deleteAdmin = async (id) => {
    try{
        const { data: response } = await makeRequest.delete(`/admin/admins/${ id }`);
        return response;
    } catch (error) {
        if (err.response) {
            throw new Error(err.response.data.message || "Failed to fetch admins.");
        }
        throw err;
    }
}
