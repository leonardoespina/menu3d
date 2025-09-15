import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../api"; // Importar la instancia de Axios

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));
  const isAuthenticated = ref(!!token.value);

  const login = async (credentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      const responseData = response.data;

      if (responseData.token && responseData.usuario) {
        token.value = responseData.token;
        user.value = responseData.usuario;
        isAuthenticated.value = true;

        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.usuario));

        return { success: true, data: responseData };
      }
      // No es necesario un 'else', si la respuesta no es la esperada,
      // el interceptor de errores ya habrá actuado si hubo un código de error.
    } catch (error) {
      // El interceptor ya manejó la notificación de UI.
      // Opcionalmente, puedes registrar el error o devolver un estado de fallo.
      console.error("Fallo la autenticación:", error);
      return { success: false, error: "Credenciales inválidas" };
    }
  };

  // Nueva función de registro
  const register = async (userData) => {
    try {
      const response = await api.post("/api/auth/register", userData);
      // Si la petición es exitosa (2xx), simplemente devolvemos éxito.
      // El interceptor se encarga del resto.
      return { success: true, data: response.data };
    } catch (error) {
      // El interceptor ya mostró el error al usuario.
      console.error("Fallo el registro:", error);
      return { success: false, error: "No se pudo completar el registro" };
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Inicializar desde localStorage
  const initialize = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
      isAuthenticated.value = true;
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    register, // Exportar la nueva función
    logout,
    initialize,
  };
});
