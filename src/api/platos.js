import api from "../api";

const DISH_API_URL = "/api/platos";

export const getDishes = async (
  page = 1,
  pageSize = 10,
  category = null,
  search = ""
) => {
  try {
    const params = { page, pageSize };
    if (category) {
      params.category = category;
    }
    if (search) {
      params.search = search;
    }
    const response = await api.get(DISH_API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};

export const getDish = async (id) => {
  try {
    const response = await api.get(`${DISH_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching dish ${id}:`, error);
    throw error;
  }
};

export const createDish = async (data) => {
  try {
    const response = await api.post(DISH_API_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating dish:", error);
    throw error;
  }
};

export const updateDish = async (id, data) => {
  try {
    const response = await api.put(`${DISH_API_URL}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating dish ${id}:`, error);
    throw error;
  }
};

export const deleteDish = async (id) => {
  try {
    const response = await api.delete(`${DISH_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting dish ${id}:`, error);
    throw error;
  }
};
