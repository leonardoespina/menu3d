<!-- CategorySwiper.vue -->
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CategoryButton from "./CategoryButton.vue";
const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  selectedCategory: {
    type: [String, Number], // Aceptar ambos tipos
    default: "All",
  },
});

defineEmits([
  "toggleCategory",
  "interactionStart",
  "interactionEnd",
  "load-more",
]);

const modules = [Navigation];
</script>

<template>
  <div class="swiper-container">
    <Swiper
      :slides-per-view="'auto'"
      :space-between="10"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :modules="modules"
      @touch-start="$emit('interactionStart')"
      @touch-end="$emit('interactionEnd')"
      @mousedown="$emit('interactionStart')"
      @mouseup="$emit('interactionEnd')"
      @reach-end="$emit('load-more')"
    >
      <SwiperSlide>
        <CategoryButton
          :category="{ id: 'All', nombre: 'All' }"
          :is-active="selectedCategory === 'All' || selectedCategory === 'All'"
          @click="$emit('toggleCategory', 'All')"
        />
      </SwiperSlide>

      <SwiperSlide v-for="category in categories" :key="category.id">
        <CategoryButton
          :category="category"
          :is-active="
            selectedCategory === category.nombre ||
            selectedCategory === category.id
          "
          @click="$emit('toggleCategory', category)"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
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
