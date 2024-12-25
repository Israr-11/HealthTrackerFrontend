import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://healthtrackerbackend-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const createDietGoal = async (data) => {
    try {
        const response = await apiClient.post(`/api/diet-goal`, data);
        return response;
    } catch (error) {
        console.error("Error creating diet goals:", error);
        throw error;
    }
};

export const getDietGoalsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/diet-goal/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching diet goals:", error);
        throw error;
    }
};




export const createDietGoalAndLog = async (data) => {
    try {
        const response = await apiClient.post(`/api/diet-goal-and-log`, data);
        return response;
    } catch (error) {
        console.error("Error creating diet log:", error);
        throw error;
    }
};

export const getDietLogByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/diet-goal-and-log/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching diet logs:", error);
        throw error;
    }
};

export default apiClient;
