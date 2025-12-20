// services/claimsService.ts
import apiClient from "../helpers/apiClient";
import { ClaimsActionsCreateModel } from "../pages/claims/models/ClaimsActionsCreateModel";
import { ClaimsTransactionsCreateModel } from "../pages/claims/models/ClaimsTransactionsCreateModel";
import { ClassLawsuitCreateModel } from "../pages/claims/models/ClassLawsuitCreateModel";

export const createClaims = async (
  file: File,
  user?: number,
  onUploadProgress?: (progressEvent: ProgressEvent) => void
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_user_id', user && user > 0 ? user.toString() : '');

    const response = await apiClient.post('claims/transactions/import-data/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    });
    return response.data;
  } catch (error) {
    console.error('Error to upload file:', error);
    throw error;
  }
};

export const getActionsClaims = async (company_id?: number) => {
  try {
    const company = company_id ? `?company_id=${company_id}` : '';
    const response = await apiClient.get(`claims/claim-actions/${company}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims actions:', error);
    throw error;
  }
};

export const getActionsClaimsById = async (id: number) => {
  try {
    const response = await apiClient.get(`/claims/claim-actions/${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching claim action:', error);
    throw error;
  }
};

export const createActionsClaim = async (data: ClaimsActionsCreateModel) => {
  try {
    const response = await apiClient.post(`/claims/claim-actions/`, data);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching claim transaction:', error);
    throw error;
  }
}

export const updateActionsClaim = async (id: number, data: ClaimsActionsCreateModel) => {
  try {
    const response = await apiClient.put(`/claims/claim-actions/${id}/`, data);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching claim transaction:', error);
    throw error;
  }
}

export const deleteActionsClaim = async (id: number) => {
  try {
    const response = await apiClient.delete(`/claims/claim-actions/${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching claim action:', error);
    throw error;
  }
}

export const getTransactionsClaims = async (page: number, user_id?: number) => {
  try {
    const user = user_id ? `&user_id=${user_id}` : '';
    const response = await apiClient.get(`claims/claim-transactions/?page=${page}${user}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching claims transactions:', error);
    throw error;
  }
};


export const getTransactionsClaimById = async (id: number) => {
  try {
    const response = await apiClient.get(`/claims/claim-transactions/${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching claim action:', error);
    throw error;
  }
};

export const createTransactionsClaim = async (data: ClaimsTransactionsCreateModel, user_id?: number) => {
  try {
    const response = await apiClient.post(`/claims/claim-transactions/?user=${user_id??''}`, data);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching claim transaction:', error);
    throw error;
  }
}

export const updateTransactionsClaim = async (id: number, data: ClaimsTransactionsCreateModel) => {
  try {
    const response = await apiClient.put(`/claims/claim-transactions/${id}/`, data);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching claim transaction:', error);
    throw error;
  }
}

export const deleteTransactionsClaim = async (id: number) => {
  try {
    const response = await apiClient.delete(`/claims/claim-transactions/${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching claim transaction:', error);
    throw error;
  }
}

export const getTransactionsLogs = async (guid: string) => {
  try {
    const response = await apiClient.get(`claims/import-logs/${guid}/`);

    return response.data;
  } catch (error) {
    console.error('Error fetching logs transactions:', error);
    throw error;
  }
};

export const getClaimsByStatus = async (user_id?: string) => {
  try {
    const user = user_id ? `?user_id=${Number(user_id)}` : '';
    const response = await apiClient.get(`claims/claim-actions/dashboard/${user}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims by status:', error);
    throw error;
  }
};

export const getClassLawsuits = async (company_id?: number) => {
  try {
    const company = company_id ? `?company_id=${company_id}` : ''
    const response = await apiClient.get(`claims/class-actions/${company}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims by status:', error);
    throw error;
  }
}

export const getClassLawsuitDetails = async (id: number) => {
  try {
    const response = await apiClient.get(`claims/class-actions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims by status:', error);
    throw error;
  }
}

export const deleteClassLawsuit = async (id: number) => {
  try {
    const response = await apiClient.delete(`claims/class-actions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims by status:', error);
    throw error;
  }
}

export const createClassLawsuit = async (values: ClassLawsuitCreateModel) => {
  try {
    const response = await apiClient.post(`claims/class-actions/`, values);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims by status:', error);
    throw error;
  }
}

export const updateClassLawsuit = async (id: number, values: ClassLawsuitCreateModel) => {
  try {
    const response = await apiClient.put(`claims/class-actions/${id}`, values);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims by status:', error);
    throw error;
  }
}

export const generateClaim = async (id: number) => {
  try {
    const response = await apiClient.get(`claims/claim-actions/generate-claim/${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error creating claim:', error);
    throw error;
  }
}

export const getClaimDetails = async (id: number) => {
  try {
    const response = await apiClient.get(`claims/claim-actions/details/${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error creating claim:', error);
    throw error;
  }
}