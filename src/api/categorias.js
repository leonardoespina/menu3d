import api from "../api";

const CATEGORY_API_URL = "/api/categorias";

export const getCategories = async (params = {}) => {
  try {
    const response = await api.get(CATEGORY_API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategory = async (id) => {
  try {
    const response = await api.get(`${CATEGORY_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    const response = await api.post(CATEGORY_API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await api.put(`${CATEGORY_API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating category ${id}:`, error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`${CATEGORY_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error);
    throw error;
  }
};
