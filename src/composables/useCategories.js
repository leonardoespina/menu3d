// useCategories.js
import { ref } from "vue";
import { getCategories } from "../api/categorias.js";
import { useAuthStore } from "../stores/auth.js";

export function useCategories() {
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const authStore = useAuthStore();

  const loadCategories = async () => {
    try {
      loading.value = true;
      error.value = null;
      const data = await getCategories(authStore.token);
      categories.value = data;
    } catch (err) {
      console.error("Failed to load categories:", err);
      error.value = err.message || "Error al cargar categorías";
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    loading,
    error,
    loadCategories,
  };
}
