import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://healthtrackerbackend-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const createScreenTimeGoal = async (data) => {
    try {
        const response = await apiClient.post(`/api/screen-time-goal`, data);
        return response;
    } catch (error) {
        console.error("Error creating screen time goals:", error);
        throw error;
    }
};

export const getScreenTimeGoalsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/screen-time-goal/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching screen time goals:", error);
        throw error;
    }
};


export const createScreenTimeGoalsAndLogs = async (data) => {
    try {
        const response = await apiClient.post(`/api/screen-time-goal-and-log`, data);
        return response;
    } catch (error) {
        console.error("Error creating screen time log:", error);
        throw error;
    }
};

export const getScreenTimeLogsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/screen-time-goal-and-log/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching screen time logs:", error);
        throw error;
    }
};

export default apiClient;
