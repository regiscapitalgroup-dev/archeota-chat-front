import store from "../../setup/redux/Store";
import apiClient from "../helpers/apiClient";

export const sendMessageChat = async (question: string, sessionId?: string) => {
    try {

        const { auth: { accessToken } } = store.getState();


        if (accessToken) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await apiClient.post('chat/', {
            question,
            chat_session_id: sessionId ?? null
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        throw error;
    }
};

export const getChatHistory = async () => {
    try {
        const response = await apiClient.get('chat/sessions/');
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
};

export const getChatDetail = async (chatId: string) => {
    try {
        const response = await apiClient.get(`chat/sessions/${chatId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
};

export const associateChats = async (chatId: string) => {
    try {
        const response = await apiClient.post(`chat/sessions/associate/`, {
            anonymous_session_id: chatId
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}