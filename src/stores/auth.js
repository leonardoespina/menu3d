import { defineStore } from "pinia";
import { ref } from "vue";
import { post } from "../api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));
  const isAuthenticated = ref(!!token.value);

  const login = async (credentials) => {
    try {
      const response = await post("/api/auth/login", credentials);

      if (response.token && response.usuario) {
        token.value = response.token;
        user.value = response.usuario;
        isAuthenticated.value = true;

        // Guardar en localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.usuario));

        return { success: true, data: response };
      }
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        error: error.message || "Error al iniciar sesión",
      };
    }
  };

  // Nueva función de registro
  const register = async (userData) => {
    try {
      const response = await post("/api/auth/register", userData);

      if (response.message) {
        return { success: true, data: response };
      }
    } catch (error) {
      console.error("Error en registro:", error);
      return {
        success: false,
        error: error.message || "Error al crear la cuenta",
      };
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
