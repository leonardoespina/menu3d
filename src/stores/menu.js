// C:/restaurant-3d-menu/src/stores/menu.js

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import menuItems from "../menu.js";

export const useMenuStore = defineStore("menu", () => {
  const items = ref(menuItems);
  const categories = computed(() => {
    const allCategories = items.value.map((item) => item.category);
    const uniqueCategories = [...new Set(allCategories)];
    return ["All", ...uniqueCategories];
  });
  const currentIndex = ref(0);
  const isLoading = ref(true);
  const searchQuery = ref("");
  const selectedCategory = ref("All");
  const isInteractingWithFilters = ref(false);
  const showWelcome = ref(true);

  const filteredItems = computed(() => {
    let result = items.value;

    if (selectedCategory.value !== "All") {
      result = result.filter(
        (item) => item.category === selectedCategory.value
      );
    }

    if (searchQuery.value) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    return result;
  });

  const currentItem = computed(() => {
    return filteredItems.value[currentIndex.value] || {};
  });

  const goToNextItem = () => {
    if (currentIndex.value < filteredItems.value.length - 1) {
      currentIndex.value++;
    } else {
      currentIndex.value = 0;
    }
  };

  const goToPrevItem = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    } else {
      currentIndex.value = filteredItems.value.length - 1;
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

  const toggleShowWelcome = () => {
    showWelcome.value = !showWelcome.value;
  };

  return {
    items,
    categories,
    currentIndex,
    isLoading,
    searchQuery,
    selectedCategory,
    filteredItems,
    currentItem,
    isInteractingWithFilters,
    goToNextItem,
    goToPrevItem,
    setCategory,
    applyFilters,
    initializeFilter,
    setLoading,
    setInteractingWithFilters,
    showWelcome,
    toggleShowWelcome,
  };
});
