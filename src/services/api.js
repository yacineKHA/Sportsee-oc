import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

export const getMainData = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur: ", error);
        return null;
    }
};

export const getActivityData = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}/activity`);
        return response.data.data.sessions;
    } catch (error) {
        console.error("Erreur lors de la récupération des données d'activitées utilisateur: ", error);
        return null;
    }
};

export const getAverageSessions = async (userId)=> {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}/average-sessions`);
        return response.data.data.sessions
    } catch (error) {
        console.error("Erreur lors de la récupération des données des sessions utilisateur: ", error);
        return null;
    }
}

export const getUserPerformance = async (userId)=> {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}/performance`);
        return response.data.data
    } catch (error) {
        console.error("Erreur lors de la récupération des performances utilisateur: ", error);
        return null;
    }
}
