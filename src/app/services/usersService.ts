import apiClient from "../helpers/apiClient";
import { UserFormModel } from "../pages/users/models/UserFormModel";


export const createUser = async (body: UserFormModel) => {
    try {
        const response = await apiClient.post('auth/users/', body);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export const userImage = async (id: number, image: File) => {
    try {
        const formData = new FormData()
        formData.append('profile_picture', image)
        const response = await apiClient.post(`auth/users/${id}/upload-picture/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await apiClient.delete(`auth/users/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export const getUserById = async (id: number) => {
    try {
        const response = await apiClient.get(`auth/users/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};


export const updateUser = async (id: number, value: UserFormModel) => {
    try {
        const response = await apiClient.put(`auth/users/${id}/`, value);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await apiClient.get('auth/users/');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUsersRoles = async () => {
    try {
        const response = await apiClient.get('auth/roles/');
        return response.data;
    } catch (error) {
        console.error('Error fetching users roles:', error);
        throw error;
    }
};

export const getUsersManagers = async (company_id: number) => {
    try {
        const response = await apiClient.get(`auth/assignment/managers/?company_id=${company_id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users roles:', error);
        throw error;
    }
};  

export const getClients = async (company_id: number | null) => {
    try {
        const response = await apiClient.get(`auth/users/clients/?company_id=${company_id??''}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users roles:', error);
        throw error;
    }
}