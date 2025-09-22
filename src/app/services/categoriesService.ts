import apiClient from "../helpers/apiClient";


export const getCategories = async () => {
    try {
      const response = await apiClient.get('assets/my-categories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };