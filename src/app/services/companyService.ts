import apiClient from "../helpers/apiClient";

export const getCompanies = async () => {
    try {
        const response = await apiClient.get(`auth/companies/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
}

export const createCompany = async (data: { name: string }) => {
    try {
        const response = await apiClient.post(`auth/companies/`, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching create a company:', error);
        throw error;
    }
}

export const updateCompany = async (id: number, data: { name: string }) => {
    try {
        const response = await apiClient.put(`auth/companies/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching edit a company:', error);
        throw error;
    }
}

export const removeCompany = async (id: number) => {
    try {
        const response = await apiClient.delete(`auth/companies/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching delete a company:', error);
        throw error;
    }
}