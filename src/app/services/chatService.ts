import store from "../../setup/redux/Store";
import apiClient from "../helpers/apiClient";

export const sendMessageChat = async (question: string) => {
    try {

        const { auth: { accessToken } } = store.getState();
        

        if (accessToken) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await apiClient.post('chat/', {
            question
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        throw error;
    }
};

