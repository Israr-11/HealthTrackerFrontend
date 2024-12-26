import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://healthtrackerbackend-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const createHealthGoal = async (data) => {
    try {
        const response = await apiClient.post(`/api/health-goal`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getHealthGoalsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/health-goal/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
};


export const createHealthGoalsAndLogs = async (data) => {
    try {
        const response = await apiClient.post(`/api/health-goal-and-log`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getHealthLogsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/health-goal-and-log/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export default apiClient;
