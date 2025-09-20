import api from "../api";

/**
 * Obtiene los datos públicos de la empresa desde la API.
 * @returns {Promise<Object>} Una promesa que resuelve con los datos de la empresa.
 */
export const getEmpresaPublico = async () => {
  try {
    const response = await api.get("/api/empresa/");
    console.log(response.data);
    return response.data[0];
  } catch (error) {
    console.error("Error al obtener los datos de la empresa:", error);
    // El interceptor de api.js ya maneja la notificación al usuario.
    // Aquí podríamos lanzar el error para que el componente que llama pueda manejarlo si es necesario.
    throw error;
  }
};
