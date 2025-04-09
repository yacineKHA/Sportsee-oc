import axios from "axios";
import mainData from "../mocks/userMainData.json"
import userActivity from "../mocks/userActivity.json"
import userAverageSessions from "../mocks/userAverageSessions.json";
import userPerformance from "../mocks/userPerformance.json"

const BASE_URL = "http://localhost:3000/user";

export const getMainData = async (userId, USE_MOCK) => {
    if (USE_MOCK) {
        const user = mainData.find(user => user.id === parseInt(userId));
        if (!user) {
            return null;
        }
        return user;
    }

    try {
        const response = await axios.get(`${BASE_URL}/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur: ", error);
        return null;
    }
};

export const getActivityData = async (userId, USE_MOCK) => {
    if (USE_MOCK) {
        const user = userActivity.find(user => user.userId === parseInt(userId));
        if (!user) {
            return null;
        }
        return user.sessions;
    }

    try {
        const response = await axios.get(`${BASE_URL}/${userId}/activity`);
        return response.data.data.sessions;
    } catch (error) {
        console.error("Erreur lors de la récupération des données d'activitées utilisateur: ", error);
        return null;
    }
};

export const getAverageSessions = async (userId, USE_MOCK) => {
    if (USE_MOCK) {
        const user = userAverageSessions.find(user => user.userId === parseInt(userId));
        if (!user) {
            return null;
        }
        return user.sessions;
    }

    try {
        const response = await axios.get(`${BASE_URL}/${userId}/average-sessions`);
        return response.data.data.sessions
    } catch (error) {
        console.error("Erreur lors de la récupération des données des sessions utilisateur: ", error);
        return null;
    }
}

export const getUserPerformance = async (userId, USE_MOCK) => {
    if (USE_MOCK) {
        const user = userPerformance.find(user => user.userId === parseInt(userId));
        if (!user) {
            return null;
        }
        return user;
    }

    try {
        const response = await axios.get(`${BASE_URL}/${userId}/performance`);
        return response.data.data
    } catch (error) {
        console.error("Erreur lors de la récupération des performances utilisateur: ", error);
        return null;
    }
}
