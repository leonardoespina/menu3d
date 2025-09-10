// useCategories.js
import { ref, readonly } from "vue";
import { getCategories } from "../api/categorias.js";
import { useAuthStore } from "../stores/auth.js";

export function useCategories() {
  const categories = ref([]);
  const loading = ref(false);
  const loadingMore = ref(false);
  const error = ref(null);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const authStore = useAuthStore();

  const loadCategories = async () => {
    if (loading.value) return;

    try {
      loading.value = true;
      error.value = null;
      const response = await getCategories(
        { page: 1, limit: 10 },
        authStore.token
      );
      categories.value = response.data;
      totalPages.value = response.totalPages;
      currentPage.value = 1;
    } catch (err) {
      console.error("Failed to load categories:", err);
      error.value = err.message || "Error al cargar categorías";
    } finally {
      loading.value = false;
    }
  };

  const loadMoreCategories = async () => {
    if (loadingMore.value || currentPage.value >= totalPages.value) return;

    try {
      loadingMore.value = true;
      error.value = null;
      const nextPage = currentPage.value + 1;
      const response = await getCategories(
        { page: nextPage, limit: 10 },
        authStore.token
      );

      categories.value = [...categories.value, ...response.data];
      currentPage.value = nextPage;
      totalPages.value = response.totalPages;
    } catch (err) {
      console.error("Failed to load more categories:", err);
      error.value = err.message || "Error al cargar más categorías";
    } finally {
      loadingMore.value = false;
    }
  };

  return {
    categories: readonly(categories),
    loading: readonly(loading),
    loadingMore: readonly(loadingMore),
    error: readonly(error),
    loadCategories,
    loadMoreCategories,
  };
}
