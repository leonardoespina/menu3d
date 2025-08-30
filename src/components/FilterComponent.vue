<script setup>
import { ref, onMounted } from "vue";
import { useMenuStore } from "../stores/menu";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { getCategories } from "../../src/api/categorias";
import "swiper/css";
import "swiper/css/navigation";

const emit = defineEmits(["interactionStart", "interactionEnd"]);

const menuStore = useMenuStore();
const categories = ref([]);

/*const toggleCategory = (category) => {
  if (category === "All") {
    menuStore.setCategory("All");
  } else {
    menuStore.setCategory(category.nombre);
  }
};*/

const toggleCategory = (category) => {
  if (category === "All") {
    menuStore.setCategory("All");
  } else {
    // Enviar el ID de la categoría en lugar del nombre
    menuStore.setCategory(category.id);
  }
};

onMounted(async () => {
  try {
    const data = await getCategories();
    categories.value = data;
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
});

const modules = [Navigation];

const handleInteractionStart = () => {
  emit("interactionStart");
};

const handleInteractionEnd = () => {
  emit("interactionEnd");
};
</script>

<template>
  <div class="filter-container">
    <div class="search-bar"></div>

    <div class="swiper-container">
      <Swiper
        :slides-per-view="'auto'"
        :space-between="10"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :modules="modules"
        @touch-start="handleInteractionStart"
        @touch-end="handleInteractionEnd"
        @mousedown="handleInteractionStart"
        @mouseup="handleInteractionEnd"
      >
        <SwiperSlide
          key="all"
          :class="{ active: menuStore.selectedCategory === 'All' }"
          @click="toggleCategory('All')"
          class="category-button"
        >
          All
        </SwiperSlide>
        <SwiperSlide
          v-for="category in categories"
          :key="category.id"
          :class="{ active: menuStore.selectedCategory === category.nombre }"
          @click="toggleCategory(category)"
          class="category-button"
        >
          {{ category.nombre }}
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
/* ... (estilos existentes) ... */
.filter-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  max-width: 500px;
  margin: 31px auto 0; /* Margen superior aumentado */
  padding-top: 10px;
}

.search-bar {
  position: relative;
  width: 100%;
}

.search-input {
  width: 84%;
  padding: 10px 15px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

.swiper-container {
  position: relative;
  width: 100%;
  padding: -1 40px;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: auto;
}

.category-button {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  color: white;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.category-button.active {
  background: #22c55e;
  border-color: #22c55e;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
  font-weight: bold;
}

/* Estilos de las flechas de navegación de Swiper */
.swiper-nav-btn {
  color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  backdrop-filter: blur(2px);
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.swiper-nav-btn:after {
  font-size: 12px;
}

.swiper-nav-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.swiper-button-prev {
  left: 0;
}

.swiper-button-next {
  right: 0;
}

/* Media query para ocultar las flechas en pantallas grandes */
@media (min-width: 768px) {
  .swiper-nav-btn {
    display: none;
  }
  .swiper-container {
    padding: 0;
  }
}
</style>
