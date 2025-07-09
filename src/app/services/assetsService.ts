import apiClient from "../helpers/apiClient";
import { AssetsCreateModel } from "../pages/assets/models/AssetsCreateModel";


export const createAssets = async (body: AssetsCreateModel) => {
  try {

    const formData = new FormData()
    formData.append('name', body.name)
    formData.append('acquisition_value', (body.acquisitionValue ?? 0).toString())
    formData.append('estimated_value', (body.estimatedValue ?? 0).toString())
    formData.append('low_value', (body.lowValue ?? 0).toString())
    formData.append('high_value', (body.highValue ?? 0).toString())

    if (body.category) {
      formData.append('category', String(body.category))
    }
    if (body.syntasisSummary) {
      formData.append('syntasis_summary', body.syntasisSummary)
    }
    if (body.fullConversationHistory) {
      formData.append('full_conversation_history', body.fullConversationHistory)
    }

    if (body.photo instanceof File) {
      formData.append('photo', body.photo)
    }

    if (body.attributes && Object.keys(body.attributes).length > 0) {
      formData.append('attributes', JSON.stringify(body.attributes));
    }

    const response = await apiClient.post('assets/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error to create asset:', error);
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
    formData.append('acquisition_value', (body.acquisitionValue ?? 0).toString())
    formData.append('estimated_value', (body.estimatedValue ?? 0).toString())
    formData.append('low_value', (body.lowValue ?? 0).toString())
    formData.append('high_value', (body.highValue ?? 0).toString())
    if (body.category) {
      formData.append('category', String(body.category))
    }

    if (body.syntasisSummary) {
      formData.append('syntasis_summary', body.syntasisSummary)
    }
    if (body.fullConversationHistory) {
      formData.append('full_conversation_history', body.fullConversationHistory)
    }

    if (body.photo instanceof File) {
      formData.append('photo', body.photo)
    }

    if (body.attributes && Object.keys(body.attributes).length > 0) {
      formData.append('attributes', JSON.stringify(body.attributes));
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

export const getAssetCategories = async () => {
  try {
    const response = await apiClient.get('assets/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching assets  categories:', error);
    throw error;
  }
};

export const getAssetByCategories = async () => {

  try {
    const response = await apiClient.get('assets/assets-by-category/');
    return response.data;
  } catch (error) {
    throw error;

  }

}