import apiClient from "../helpers/apiClient";
import { UserCreateModel } from "../pages/users/models/UsersCreateModel";


export const createUser = async (body: UserCreateModel) => {
    try {

        const response = await apiClient.post('users/', body);
        return response.data;
    } catch (error) {
        console.error('Error the create user:', error);
        throw error;
    }
};

export const getUserById = async (id: number) => {
    try {
        const response = await apiClient.get(`users/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};


export const updateUser = async (body: UserCreateModel) => {
    try {
        const response = await apiClient.put(`users/${body.id}/`, body);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await apiClient.get('users/');
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