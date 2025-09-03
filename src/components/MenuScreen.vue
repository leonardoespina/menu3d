<script setup>
import { ref, watch, onMounted } from "vue";
import { useMenuStore } from "../stores/menu";
import FilterComponent from "../components/FilterComponent.vue";
import { useCartStore } from "../stores/cart";
import AppBar from "../components/AppBar.vue";
import { UPLOADS_BASE_URL } from "../api";

const menuStore = useMenuStore();
const cartStore = useCartStore();
const viewer = ref(null);

const cardInfo = ref(null);

const triggerSlideUp = () => {
  if (cardInfo.value) {
    cardInfo.value.classList.add("slide-up");
    setTimeout(() => {
      cardInfo.value.classList.remove("slide-up");
    }, 500);
  }
};

watch(
  () => menuStore.currentIndex,
  (newVal, oldVal) => {
    triggerSlideUp();
    menuStore.setLoading(true);

    setTimeout(() => {
      menuStore.setLoading(false);
    }, 800);
  }
);

onMounted(() => {
  if (viewer.value) {
    viewer.value.addEventListener("load", () => {
      menuStore.setLoading(false);
      viewer.value.autoRotate = true;
    });
  }
  menuStore.initializeFilter();
});

const handleFilterInteractionStart = () => {
  if (viewer.value) {
    viewer.value.cameraControls = false;
  }
};

const handleToggleMenu = () => {
  console.log("Toggle menu clicked");
};

const handleFilterInteractionEnd = () => {
  if (viewer.value) {
    viewer.value.cameraControls = true;
  }
};
</script>

<template>
  <div id="menu-screen">
    <div class="menu-container">
      <AppBar @toggle-menu="handleToggleMenu" />

      <!-- Contenedor para el filtro con mejor visualización -->
      <div class="filter-wrapper">
        <FilterComponent
          @interaction-start="handleFilterInteractionStart"
          @interaction-end="handleFilterInteractionEnd"
        />
      </div>

      <div class="model-container">
        <div class="loader" v-if="menuStore.isLoading">Cargando...</div>
        <model-viewer
          ref="viewer"
          :src="UPLOADS_BASE_URL + menuStore.currentItem.imagen"
          alt="Modelo"
          ar
          camera-controls
          shadow-intensity="1"
          camera-orbit="0deg 90deg 1.5m"
          interaction-policy="allow-when-focused"
          touch-action="none"
        >
        </model-viewer>
        <div class="menu-swiper-button-prev" @click="menuStore.goToPrevItem">
          <
        </div>
        <div class="menu-swiper-button-next" @click="menuStore.goToNextItem">
          >
        </div>
      </div>

      <!-- Espaciador para mejorar la separación -->
      <div class="info-spacer"></div>

      <div class="card-info" ref="cardInfo">
        <div class="card-title">{{ menuStore.currentItem.nombre }}</div>
        <div class="card-price">{{ menuStore.currentItem.precio }}</div>
        <div class="card-rating">
          <span>★ 4.5 (6,986)</span>
        </div>
        <div class="card-ingredients">
          {{ menuStore.currentItem.descripcion }}
        </div>
        <button
          class="add-to-cart-button"
          @click="
            cartStore.addItem({
              ...menuStore.currentItem,
              title: menuStore.currentItem.nombre,
              price: menuStore.currentItem.precio,
            })
          "
          :class="{ 'in-cart': cartStore.isInCart(menuStore.currentItem) }"
        >
          {{
            cartStore.isInCart(menuStore.currentItem)
              ? "Added to Cart"
              : "Add to Cart"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: bold;
}

/* Información del producto */
.card-info {
  padding: clamp(1rem, 4vw, 1.5rem);
  position: relative;
  margin-top: 0.5rem;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  transform: translateY(0);
  opacity: 1;
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}

.slide-up {
  animation: slideUp 0.5s ease-in-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.card-title {
  font-size: clamp(2rem, 2.5vw, 1.5rem);
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: white;
}

.card-price {
  color: #22c55e;
  font-weight: bold;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  margin-bottom: 0.5rem;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(0.7rem, 1.8vw, 0.9rem);
}

.card-ingredients {
  font-size: clamp(0.7rem, 1.8vw, 0.9rem);
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-right: 90px; /* Cambiado de margin-right a padding-right */
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.ingredient-tag {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: clamp(0.6rem, 1.5vw, 0.8rem);
}

/* Botón agregar al carrito */
.add-to-cart-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: clamp(0.4rem, 1.5vw, 0.8rem) clamp(0.8rem, 2vw, 1.2rem);
  text-align: center;
  position: absolute;
  bottom: clamp(1rem, 3vw, 1.5rem);
  right: clamp(1rem, 3vw, 1.5rem);
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  cursor: pointer;
  border-radius: 5px;
  z-index: 2;
}

.add-to-cart-button.in-cart {
  background-color: #22c55e;
}

#menu-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/3.jpg") no-repeat center center;
  background-size: cover;
  z-index: 2000;
  padding: 1rem;
}

#menu-screen::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
}

/* Botones navegación */
.menu-swiper-button-next,
.menu-swiper-button-prev {
  color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: rgba(0, 0, 0, 0.5);
  width: clamp(28px, 4vw, 36px);
  height: clamp(28px, 4vw, 36px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  margin: 0;
  cursor: pointer;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
}

.menu-swiper-button-next:hover,
.menu-swiper-button-prev:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.menu-swiper-button-next {
  right: clamp(5px, 1vw, 20px);
}

.menu-swiper-button-prev {
  left: clamp(5px, 1vw, 20px);
}

.menu-container {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 520px;
  height: auto;
  max-height: 90vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.model-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  max-height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
}

model-viewer {
  width: 100%;
  height: 100%;
}

/* Nuevos estilos añadidos */
.filter-wrapper {
  margin-bottom: 0.5rem;
  overflow: visible;
  height: auto;
}

.info-spacer {
  height: 0.5rem;
}

/* Media queries para móviles */
@media (max-width: 768px) {
  #menu-screen {
    padding: 0;
    align-items: stretch;
  }

  .menu-container {
    width: 100%;
    max-width: none;
    max-height: none;
    height: 100%;
    border-radius: 0;
    padding: 0.8rem;
    gap: 0.6rem;
  }

  .model-container {
    max-height: 52vh;
    flex: 1;
  }

  .card-info {
    margin-top: 0.3rem;
    padding: 0.8rem;
  }

  .card-ingredients {
    margin-right: 80px;
  }

  .add-to-cart-button {
    bottom: 0.6rem;
    right: 0.6rem;
    padding: 0.5rem 1rem;
  }

  .filter-wrapper {
    max-height: none;
    overflow-x: auto;
    padding-bottom: 0.3rem;
  }

  .filter-wrapper::-webkit-scrollbar {
    height: 4px;
  }

  .filter-wrapper::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
}

@media (max-height: 700px) {
  .model-container {
    max-height: 45vh;
  }

  .menu-container {
    max-height: 100vh;
    overflow-y: auto;
  }

  .card-info {
    padding: 0.8rem;
  }
}

/* Para dispositivos muy pequeños en orientación vertical */
@media (max-width: 360px) and (max-height: 640px) {
  .menu-container {
    padding: 0.6rem;
    gap: 0.4rem;
  }
  .card-ingredients {
    padding-right: 70px; /* Ajuste para dispositivos muy pequeños */
    font-size: 0.75rem;
  }

  .model-container {
    max-height: 48vh;
  }

  .card-info {
    padding: 0.6rem;
  }

  .card-ingredients {
    margin-right: 70px;
    font-size: 0.75rem;
  }

  .add-to-cart-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
    bottom: 0.5rem;
    right: 0.5rem;
  }

  .info-spacer {
    height: 0.3rem;
  }
}

/* Para tablets y dispositivos más grandes */
@media (min-width: 769px) and (max-width: 1024px) {
  .model-container {
    max-height: 58vh;
  }
}
</style>
