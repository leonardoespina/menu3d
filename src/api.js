import axios from "axios";
import { useUIStore } from "./stores/ui";
import { useAuthStore } from "./stores/auth";

export const API_BASE_URL = "https://api-menu3d.vercel.app";
//export const API_BASE_URL = "https://jc20pgnt-5000.use2.devtunnels.ms";
//export const API_BASE_URL = "http://192.168.1.108:5000";
//export const API_BASE_URL = "http://localhost:5000";
//export const UPLOADS_BASE_URL = `${API_BASE_URL}/uploads/`;
export const UPLOADS_BASE_URL = `https://eetgxoanfvytdavmjuvo.supabase.co/storage/v1/object/public/uploads/`;

//https://eetgxoanfvytdavmjuvo.supabase.co/storage/v1/object/public/uploads/1.glb

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

    // Si estamos enviando FormData, eliminamos el Content-Type para que
    // axios lo establezca automáticamente a 'multipart/form-data' con el boundary correcto.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
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
