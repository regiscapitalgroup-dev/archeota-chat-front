import apiClient from "../helpers/apiClient";

export const getClassifiers = async (company_id: number) => {
    try {
        const response = await apiClient.get(`auth/catalog/classifications/?company_id=${company_id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching classifiers:', error);
        throw error;
    }
}

export const removeClassifier = async (id: number) => {
    try {
        const response = await apiClient.delete(`auth/catalog/classifications/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching delete classifiers:', error);
        throw error;
    } 
}

export const updateClassifier = async (id: number, data: { color: string, name: string }) => {
    try {
        const response = await apiClient.put(`auth/catalog/classifications/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching update classifiers:', error);
        throw error;
    } 
}

export const createClassifier = async (data: { color: string, name: string, company_id: number }) => {
    try {
        const response = await apiClient.post(`auth/catalog/classifications/`, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching update classifiers:', error);
        throw error;
    } 
}