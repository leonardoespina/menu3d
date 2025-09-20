import { ref, onMounted } from "vue";
import { getEmpresaPublico } from "../services/empresaService";
import { UPLOADS_BASE_URL } from "../api";

/**
 * Composable para gestionar los datos públicos de la empresa.
 * @returns {Object} Un objeto con los datos de la empresa, el estado de carga y la URL completa del logo.
 */
export function useEmpresa() {
  const empresa = ref(null);
  const isLoading = ref(true); // Inicia en true para mostrar carga inicialmente
  const error = ref(null);

  const fetchEmpresa = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const data = await getEmpresaPublico();
      empresa.value = data;
    } catch (err) {
      error.value = "No se pudieron cargar los datos de la empresa.";
      // El interceptor de axios ya muestra una notificación,
      // pero mantenemos el estado de error por si se necesita en el componente.
    } finally {
      isLoading.value = false;
    }
  };

  // Llama a la función para obtener los datos cuando el composable se usa por primera vez.
  onMounted(fetchEmpresa);

  /**
   * Devuelve la URL completa para una imagen de la empresa.
   * @param {string} logoPath - La ruta relativa del logo.
   * @returns {string} La URL completa del logo.
   */
  const getLogoUrl = (logoPath) => {
    if (!logoPath) return null;
    return `${UPLOADS_BASE_URL}${logoPath}`;
  };

  return {
    empresa,
    isLoading,
    error,
    fetchEmpresa,
    getLogoUrl,
  };
}
