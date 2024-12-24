import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://healthtrackerbackend-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const createSleepGoal = async (data) => {
    try {
        const response = await apiClient.post(`/api/sleep-goal`, data);
        return response;
    } catch (error) {
        console.error("Error creating sleep goals:", error);
        throw error;
    }
};

export const getSleepGoalByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/sleep-goal/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching sleep goals:", error);
        throw error;
    }
};


export const createSleepGoalAndLog = async (data) => {
    try {
        const response = await apiClient.post(`/api/sleep-goal-and-stats`, data);
        return response;
    } catch (error) {
        console.error("Error creating sleep log:", error);
        throw error;
    }
};

export const getSleepLogByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/sleep-goal-and-stats/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching sleep logs:", error);
        throw error;
    }
};

export default apiClient;
