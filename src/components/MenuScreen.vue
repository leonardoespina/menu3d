<script setup>
import { ref, watch, onMounted } from "vue";
import { useMenuStore } from "../stores/menu";
import FilterComponent from "../components/FilterComponent.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import { useCartStore } from "../stores/cart";

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

const handleFilterInteractionEnd = () => {
  if (viewer.value) {
    viewer.value.cameraControls = true;
  }
};
</script>

<template>
  <div id="menu-screen">
    <div class="card" style="position: relative">
      <div class="header-container">
        <div class="menu-header"></div>
        <div class="titulo-caligrafico">Menu 3d</div>
        <FilterComponent
          @interaction-start="handleFilterInteractionStart"
          @interaction-end="handleFilterInteractionEnd"
        />
      </div>

      <div class="model-container">
        <div class="loader" v-if="menuStore.isLoading">Cargando...</div>
        <model-viewer
          ref="viewer"
          :src="menuStore.currentItem.src"
          alt="Modelo"
          ar
          camera-controls
          shadow-intensity="1"
          camera-orbit="0deg 90deg 1.5m"
          interaction-policy="allow-when-focused"
          touch-action="none"
        >
        </model-viewer>
      </div>

      <div class="card-info" ref="cardInfo">
        <div class="card-title">{{ menuStore.currentItem.title }}</div>
        <div class="card-price">{{ menuStore.currentItem.price }}</div>
        <div class="card-rating">
          <span>★ {{ menuStore.currentItem.rating }}</span>
        </div>
        <div class="card-ingredients">
          <span
            class="ingredient-tag"
            v-for="(ingredient, index) in menuStore.currentItem.ingredients"
            :key="index"
          >
            {{ ingredient }}
          </span>
        </div>
        <button
          class="add-to-cart-button"
          @click="cartStore.addItem(menuStore.currentItem)"
          :class="{ 'in-cart': cartStore.isInCart(menuStore.currentItem) }"
        >
          {{
            cartStore.isInCart(menuStore.currentItem)
              ? "Added to Cart"
              : "Add to Cart"
          }}
        </button>
      </div>

      <div class="menu-swiper-button-prev" @click="menuStore.goToPrevItem">
        <
      </div>
      <div class="menu-swiper-button-next" @click="menuStore.goToNextItem">
        >
      </div>
      <ShoppingCart />
    </div>
  </div>
</template>

<style scoped>
/* Estilos existentes */
#menu-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: url("/assets/3.jpg") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
}

.add-to-cart-button.in-cart {
  background-color: #22c55e;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}

.model-container {
  width: 100%;
  height: 60%;
  position: relative;
  top: 25%;
  background-color: transparent;
}

model-viewer {
  width: 100%;
  height: 100%;
  background-color: transparent;
  touch-action: none;
}

.loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

.card-info {
  padding: 1rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
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
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: white;
}

.card-price {
  color: #22c55e;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.card-ingredients {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.add-to-cart-button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 0;
}

.ingredient-tag {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

.header-container {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.titulo-caligrafico {
  font-family: "Dancing Script", cursive;
  font-size: 3.5rem;
  color: white;
  text-shadow: 0.5px 0.5px 0 white, -0.5px -0.5px 0 white;
  margin-bottom: 10px;
  letter-spacing: 1px;
  margin-top: -6px;
}

.menu-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.food-icon {
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: float 3s ease-in-out infinite;
  margin-bottom: 5px;
}

.menu-swiper-button-next,
.menu-swiper-button-prev {
  color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: rgba(0, 0, 0, 0.5);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  margin: 0;
  cursor: pointer;
}

.menu-swiper-button-next:hover,
.menu-swiper-button-prev:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.menu-swiper-button-next {
  right: 5px;
}

.menu-swiper-button-prev {
  left: 5px;
}

@media (min-width: 768px) {
  #menu-screen {
    position: relative;
    width: 450px;
    height: 700px;
  }

  .menu-swiper-button-next {
    right: 15px;
  }

  .menu-swiper-button-prev {
    left: 15px;
  }
}

@media (min-width: 1200px) {
  .menu-swiper-button-next {
    right: 20px;
  }

  .menu-swiper-button-prev {
    left: 20px;
  }
}
</style>
