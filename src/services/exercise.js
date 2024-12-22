import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://healthtrackerbackend-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const createExerciseSchedule = async (data) => {
    try {
        const response = await apiClient.post(`/api/exercise-schedule`, data);
        return response;
    } catch (error) {
        console.error("Error creating exercise schedule:", error);
        throw error;
    }
};

export const getExerciseSchedulesByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/exercise-schedule/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching exercise schedules:", error);
        throw error;
    }
};

export const deleteExerciseSchedulesByScheduleId = async (scheduleId) => {
    try {
        const response = await apiClient.delete(`/api/exercise-schedule/${scheduleId}`);
        return response;
    } catch (error) {
        console.error("Error deleting exercise schedule:", error);
        throw error;
    }
};

export const createExerciseLogs = async (data) => {
    try {
        const response = await apiClient.post(`/api/exercise-log`, data);
        return response;
    } catch (error) {
        console.error("Error creating exercise log:", error);
        throw error;
    }
};

export const getExerciseLogsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/exercise-log/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching exercise logs:", error);
        throw error;
    }
};

export const deleteExerciseLogsByScheduleId = async (logId) => {
    try {
        const response = await apiClient.delete(`/api/exercise-log/${logId}`);
        return response;
    } catch (error) {
        console.error("Error deleting exercise log:", error);
        throw error;
    }
};

export const createExercisePerformanceByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/exercise-performance/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching exercise performance:", error);
        throw error;
    }
};

export const getExercisePerformanceByUserPerId = async (userPerId) => {
    try {
        const response = await apiClient.get(`/api/${userPerId}/exercise-performance/`);
        return response;
    } catch (error) {
        console.error("Error fetching exercise performance by user ID:", error);
        throw error;
    }
};

export default apiClient;
