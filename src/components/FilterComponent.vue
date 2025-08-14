<script setup>
import { useMenuStore } from "../stores/menu";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// Emite eventos de inicio y fin de interacción
const emit = defineEmits(["interactionStart", "interactionEnd"]);

const menuStore = useMenuStore();

const toggleCategory = (category) => {
  menuStore.setCategory(category);
};

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
    <div class="search-bar">
      <input
        type="text"
        v-model="menuStore.searchQuery"
        @input="menuStore.applyFilters"
        placeholder="Buscar plato..."
        class="search-input"
      />
    </div>

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
          v-for="category in menuStore.categories"
          :key="category"
          :class="{ active: menuStore.selectedCategory === category }"
          @click="toggleCategory(category)"
          class="category-button"
        >
          {{ category }}
        </SwiperSlide>
      </Swiper>
      <div class="swiper-button-prev swiper-nav-btn"></div>
      <div class="swiper-button-next swiper-nav-btn"></div>
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
  margin: 0 auto;
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
  padding: 0 40px;
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
  display: flex;
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
