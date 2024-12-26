import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://healthtrackerbackend-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const getUserByEmail = async (email) => {
    try {
        const response = await apiClient.get(`/api/users/${email}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (data) => {
    try {
        const response = await apiClient.post(`/api/users`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export default apiClient;

