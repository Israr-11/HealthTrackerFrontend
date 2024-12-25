import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://healthtrackerbackend-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const createWaterGoal = async (data) => {
    try {
        const response = await apiClient.post(`/api/water-goal`, data);
        return response;
    } catch (error) {
        console.error("Error creating water goals:", error);
        throw error;
    }
};

export const getWaterGoalsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/water-goal/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching water goals:", error);
        throw error;
    }
};

export const updateWaterGoalByWaterGoalId = async (waterGoalId, goalData) => {
    try {
        const response = await apiClient.patch(`/api/water-goal/${waterGoalId}`, goalData);
        return response;
    } catch (error) {
        console.error("Error updating water goals:", error);
        throw error;
    }
};

export const createWaterGoalAndLog = async (data) => {
    try {
        const response = await apiClient.post(`/api/water-goal-and-log`, data);
        return response;
    } catch (error) {
        console.error("Error creating water log:", error);
        throw error;
    }
};

export const getWaterLogByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/water-goal-and-log/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching water logs:", error);
        throw error;
    }
};

export default apiClient;
