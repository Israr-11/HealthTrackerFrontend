import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://healthtrackerbackend-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const createWalkGoal = async (data) => {
    try {
        const response = await apiClient.post(`/api/walk-goal`, data);
        return response;
    } catch (error) {
        console.error("Error creating walk goals:", error);
        throw error;
    }
};

export const getWalkGoalsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/walk-goal/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching walk goals:", error);
        throw error;
    }
};

export const createWalkGoalAndLog = async (data) => {
    try {
        const response = await apiClient.post(`/api/walk-goal-and-log`, data);
        return response;
    } catch (error) {
        console.error("Error creating walk log:", error);
        throw error;
    }
};

export const getWalkLogByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/walk-goal-and-log/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching walk logs:", error);
        throw error;
    }
};

export default apiClient;
