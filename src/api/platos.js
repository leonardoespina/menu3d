import { get, post, put, del } from "../api";

const DISH_API_URL = "/api/platos";

export const getDishes = (
  page = 1,
  pageSize = 10,
  category = null,
  search = ""
) => {
  // Construye la URL de la API con los parámetros de la consulta
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("pageSize", pageSize);
  if (category) {
    params.append("category", category);
  }
  if (search) {
    params.append("search", search);
  }
  const url = `${DISH_API_URL}?${params.toString()}`;
  return get(url);
};

export const getDish = (id, token = null) =>
  get(`${DISH_API_URL}/${id}`, token);
export const createDish = (data, token = null) =>
  post(DISH_API_URL, data, token);
export const updateDish = (id, data, token = null) =>
  put(`${DISH_API_URL}/${id}`, data, token);
export const deleteDish = (id, token = null) =>
  del(`${DISH_API_URL}/${id}`, token);
