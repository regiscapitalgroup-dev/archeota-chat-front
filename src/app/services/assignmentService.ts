import apiClient from "../helpers/apiClient";

export const availableClients = async (manager_id: number) =>  {
    try {
        const _response = await apiClient.get(`auth/assignment/${manager_id}/available-clients/`);
        return _response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const assignedClients = async (manager_id: number) =>  {
    try {
        const _response = await apiClient.get(`auth/assignment/${manager_id}/assigned-clients/`);
        return _response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const assign = async (client_id: number, manager_id: number) => {
    try {
        const _response = await apiClient.post(`auth/assignment/assign/`, { client_id, manager_id });
        return _response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const unassign = async (client_id: number) => {
    try {
        const _response = await apiClient.post(`auth/assignment/unassign/`, { client_id });
        return _response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}