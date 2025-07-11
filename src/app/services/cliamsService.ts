// services/claimsService.ts
import apiClient from "../helpers/apiClient";

export const createClaims = async (
  file: File,
  onUploadProgress?: (progressEvent: ProgressEvent) => void
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('transactions/import-data/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress, 
    });
    return response.data;
  } catch (error) {
    console.error('Error to upload file:', error);
    throw error;
  }
};

export const getActionsClaims = async () => {
  try {
    const response = await apiClient.get('assets/claim-actions/');
    return response.data;
  } catch (error) {
    console.error('Error fetching claims actions:', error);
    throw error;
  }
};

export const getTransactionsClaims = async (page:number) => {
  try {
    const response = await apiClient.get(`assets/claim-transactions/?page=${page}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching claims transactions:', error);
    throw error;
  }
};