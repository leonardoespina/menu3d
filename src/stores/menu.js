// C:/restaurant-3d-menu/src/stores/menu.js

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getDishes } from "../api/platos";

export const useMenuStore = defineStore("menu", () => {
  const dishes = ref([]);
  const currentIndex = ref(0);
  const isLoading = ref(true);
  const searchQuery = ref("");
  const selectedCategory = ref("All");
  const isInteractingWithFilters = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const pageSize = 10;

  const fetchDishes = async (page = 1, category = null, search = "") => {
    isLoading.value = true;
    try {
      const response = await getDishes(page, pageSize, category, search);

      if (page === 1) {
        dishes.value = response.data;
      } else {
        dishes.value = [...dishes.value, ...response.data];
      }
      currentPage.value = response.currentPage;
      totalPages.value = response.totalPages;
      isLoading.value = false;
    } catch (error) {
      console.error("Failed to load dishes:", error);
      isLoading.value = false;
    }
  };

  fetchDishes();

  const filteredDishes = computed(() => {
    // La lógica de filtrado ahora se maneja en el backend.
    // Este computed se mantiene para reflejar el estado actual del array 'dishes'.
    // Si necesitas filtrar localmente, descomenta la siguiente lógica.
    // let result = dishes.value;
    // if (selectedCategory.value !== "All") {
    //   result = result.filter(item => item.categoriaId === selectedCategory.value);
    // }
    // if (searchQuery.value) {
    //   result = result.filter(item => item.nombre?.toLowerCase().includes(searchQuery.value?.toLowerCase() ?? ""));
    // }
    // return result;
    return dishes.value;
  });

  const currentItem = computed(() => {
    // Devuelve un objeto vacío si no hay platos en la lista o el índice es inválido
    if (
      !filteredDishes.value ||
      filteredDishes.value.length === 0 ||
      currentIndex.value >= filteredDishes.value.length
    ) {
      return {};
    }
    return filteredDishes.value[currentIndex.value];
  });

  const goToNextItem = () => {
    if (currentIndex.value < filteredDishes.value.length - 1) {
      currentIndex.value++;
    } else if (currentPage.value < totalPages.value && !isLoading.value) {
      currentPage.value++;
      fetchDishes(
        currentPage.value,
        selectedCategory.value === "All" ? null : selectedCategory.value,
        searchQuery.value
      ).then(() => {
        currentIndex.value++;
      });
    } else {
      currentIndex.value = 0;
    }
  };

  const goToPrevItem = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    } else {
      currentIndex.value = filteredDishes.value.length - 1;
    }
  };

  const setCategory = (categoryId) => {
    currentIndex.value = 0;
    selectedCategory.value = categoryId;
    searchQuery.value = "";
    currentPage.value = 1;
    fetchDishes(1, categoryId === "All" ? null : categoryId);
  };

  const setSearchQuery = (query) => {
    // Resetea el índice antes de cargar nuevos datos para evitar el error
    currentIndex.value = 0;
    searchQuery.value = query;
    selectedCategory.value = "All";
    currentPage.value = 1;
    fetchDishes(1, null, query);
  };

  const applyFilters = () => {
    currentIndex.value = 0;
  };

  const initializeFilter = () => {
    applyFilters();
  };

  const setLoading = (status) => {
    isLoading.value = status;
  };

  const setInteractingWithFilters = (status) => {
    isInteractingWithFilters.value = status;
  };

  return {
    dishes,
    currentIndex,
    isLoading,
    searchQuery,
    selectedCategory,
    filteredDishes,
    currentItem,
    isInteractingWithFilters,
    goToNextItem,
    goToPrevItem,
    setCategory,
    applyFilters,
    initializeFilter,
    setLoading,
    setInteractingWithFilters,
    fetchDishes,
    setSearchQuery,
  };
});
