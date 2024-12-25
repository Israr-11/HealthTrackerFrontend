import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://healthtrackerbackend-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const createMentalHealthGoal = async (data) => {
    try {
        const response = await apiClient.post(`/api/mental-health-goal`, data);
        return response;
    } catch (error) {
        console.error("Error creating mental health goals:", error);
        throw error;
    }
};

export const getMentalHealthGoalsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/mental-health-goal/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching mental health goals:", error);
        throw error;
    }
};


export const createMentalHealthGoalsAndLogs = async (data) => {
    try {
        const response = await apiClient.post(`/api/mental-health-goal-and-log`, data);
        return response;
    } catch (error) {
        console.error("Error creating mental health log:", error);
        throw error;
    }
};

export const getMentalHealthLogsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/mental-health-goal-and-log/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching mental health logs:", error);
        throw error;
    }
};

export default apiClient;
