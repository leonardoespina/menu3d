// C:/restaurant-3d-menu/src/stores/menu.js

import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import { getDishes } from "../../src/api/platos";

export const useMenuStore = defineStore("menu", () => {
  const dishes = ref([]);
  const categories = computed(() => {
    const allCategories = dishes.value.map((item) => item.categoriaId);
    const uniqueCategories = [...new Set(allCategories)];
    return ["All", ...uniqueCategories];
  });
  const currentIndex = ref(0);
  const isLoading = ref(true);
  const searchQuery = ref("");
  const selectedCategory = ref("All");
  const isInteractingWithFilters = ref(false);
  //const showWelcome = ref(true);

  const fetchDishes = async () => {
    try {
      const response = await getDishes();
      dishes.value = response.data;
      isLoading.value = false;
      console.log("Dishes:", response);
    } catch (error) {
      console.error("Failed to load dishes:", error);
    }
  };

  onMounted(() => {
    fetchDishes();
  });

  const filteredDishes = computed(() => {
    let result = dishes.value;

    if (
      selectedCategory.value !== "All" &&
      selectedCategory.value !== undefined
    ) {
      result = result.filter(
        (item) => item.categoriaId === selectedCategory.value
      );
    }

    if (searchQuery.value) {
      result = result.filter((item) =>
        item.nombre
          ?.toLowerCase()
          .includes(searchQuery.value?.toLowerCase() ?? "")
      );
    }

    return result;
  });

  const currentItem = computed(() => {
    return filteredDishes.value[currentIndex.value] || {};
  });

  const goToNextItem = () => {
    if (currentIndex.value < filteredDishes.value.length - 1) {
      currentIndex.value++;
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

  const setCategory = (category) => {
    selectedCategory.value = category;
    applyFilters();
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
    categories,
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
    //showWelcome,
    //toggleShowWelcome,
  };
});
