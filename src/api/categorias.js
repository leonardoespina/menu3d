import { get, post, put, del } from ".";

const CATEGORY_API_URL = "/api/categorias";

export const getCategories = (params = {}, token = null) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${CATEGORY_API_URL}?${query}` : CATEGORY_API_URL;
  return get(url, token);
};
export const getCategory = (id, token = null) =>
  get(`${CATEGORY_API_URL}/${id}`, token);
export const createCategory = (data, token = null) =>
  post(CATEGORY_API_URL, data, token);
export const updateCategory = (id, data, token = null) =>
  put(`${CATEGORY_API_URL}/${id}`, data, token);
export const deleteCategory = (id, token = null) =>
  del(`${CATEGORY_API_URL}/${id}`, token);
