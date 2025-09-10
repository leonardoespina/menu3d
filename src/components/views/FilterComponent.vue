<!-- FilterComponent.vue -->
<script setup>
import { computed } from "vue";
import { useMenuStore } from "../../stores/menu.js";
import CategorySwiper from "../filter/CategorySwiper.vue";
import { useCategories } from "../../composables/useCategories.js";
import { useSwiperInteractions } from "../../composables/useSwiperInteractions";

const emit = defineEmits(["interactionStart", "interactionEnd"]);
const menuStore = useMenuStore();

const { categories, loadCategories } = useCategories();
const { handleInteractionStart, handleInteractionEnd } =
  useSwiperInteractions(emit);

const toggleCategory = (category) => {
  const categoryId = category === "All" ? "All" : category.id;
  menuStore.setCategory(categoryId);
};

// Convertir el selectedCategory a string para la prop
const selectedCategoryString = computed(() => {
  return String(menuStore.selectedCategory);
});

// Cargar categorías al montar el componente
loadCategories();
</script>

<template>
  <div class="filter-container">
    <div class="search-bar"></div>

    <CategorySwiper
      :categories="categories"
      :selected-category="selectedCategoryString"
      @toggle-category="toggleCategory"
      @interaction-start="handleInteractionStart"
      @interaction-end="handleInteractionEnd"
    />
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  max-width: 500px;
  margin: 31px auto 0;
  padding-top: 10px;
}

.search-bar {
  position: relative;
  width: 100%;
}
</style>
