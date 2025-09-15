import axios from "axios";
import { useUIStore } from "./stores/ui";
import { useAuthStore } from "./stores/auth";

export const API_BASE_URL = "http://localhost:5000";
//export const API_BASE_URL = "https://jc20pgnt-5000.use2.devtunnels.ms";
export const UPLOADS_BASE_URL = `${API_BASE_URL}/uploads/`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Petición
api.interceptors.request.use(
  (config) => {
    const uiStore = useUIStore();
    uiStore.setLoading(true);

    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    const uiStore = useUIStore();
    uiStore.setLoading(false);
    return Promise.reject(error);
  }
);

// Interceptor de Respuesta
api.interceptors.response.use(
  (response) => {
    const uiStore = useUIStore();
    uiStore.setLoading(false);
    return response; // Devuelve la respuesta completa de axios
  },
  (error) => {
    const uiStore = useUIStore();
    uiStore.setLoading(false);

    let message = "Ocurrió un error inesperado.";
    if (error.response) {
      message =
        error.response.data.error ||
        error.response.data.message ||
        `Error del servidor: ${error.response.status}`;
    } else if (error.request) {
      message = "No se pudo conectar con el servidor. Revisa tu conexión.";
    } else {
      message = error.message;
    }

    uiStore.showNotification({
      message,
      type: "error",
    });

    return Promise.reject(error);
  }
);

export default api;
