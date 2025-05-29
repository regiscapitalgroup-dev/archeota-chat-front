import apiClient from "../helpers/apiClient";
import { AssetsCreateModel } from "../pages/assets/models/AssetsCreateModel";


export const createAssets = async (body: AssetsCreateModel) => {
  try {

    const formData = new FormData()
    formData.append('name', body.name)
    formData.append('value', (body.value ?? 0).toString())
    formData.append('value_over_time', (body.valueOverTime ?? 0).toString())
    if (body.syntasisSummary) {
      formData.append('syntasis_summary', body.syntasisSummary)
    }
    if (body.fullConversationHistory) {
      formData.append('full_conversation_history', body.fullConversationHistory)
    }

    if (body.photo instanceof File) {
      formData.append('photo', body.photo)
    }

    const response = await apiClient.post('assets/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear asset:', error);
    throw error;
  }
};

export const getAssetById = async (id: number) => {
  try {
    const response = await apiClient.get(`assets/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching asset:', error);
    throw error;
  }
};


export const updateAssets = async (body: AssetsCreateModel) => {
  try {

    const formData = new FormData()
    formData.append('name', body.name)
    formData.append('value', (body.value ?? 0).toString())
    formData.append('value_over_time', (body.valueOverTime ?? 0).toString())
    if (body.syntasisSummary) {
      formData.append('syntasis_summary', body.syntasisSummary)
    }
    if (body.fullConversationHistory) {
      formData.append('full_conversation_history', body.fullConversationHistory)
    }

    if (body.photo instanceof File) {
      formData.append('photo', body.photo)
    }


    const response = await apiClient.put(`assets/${body.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

export const getAssets = async () => {
  try {
    const response = await apiClient.get('assets/');
    return response.data;
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
};
