<script setup>
import { ref, watch, onMounted } from "vue";
import { useMenuStore } from "../stores/menu";
import FilterComponent from "../components/FilterComponent.vue";
//import ShoppingCart from "../components/ShoppingCart.vue";
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
  //menuStore.fetchDishes();
});

const handleFilterInteractionStart = () => {
  if (viewer.value) {
    viewer.value.cameraControls = false;
  }
};
const handleToggleMenu = () => {
  // Lógica para abrir/cerrar el menú lateral si es necesario
  console.log("Toggle menu clicked");
};

const handleFilterInteractionEnd = () => {
  if (viewer.value) {
    viewer.value.cameraControls = true;
  }
};
</script>

<template>
  <div id="welcome-screen">
    <div class="menu-container">
      <AppBar @toggle-menu="handleToggleMenu" />
      <FilterComponent
        @interaction-start="handleFilterInteractionStart"
        @interaction-end="handleFilterInteractionEnd"
      />
    </div>
  </div>
</template>

<style scoped>
#welcome-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/3.jpg") no-repeat center center;
  background-size: cover;
  z-index: 2000;
}

#welcome-screen::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(
    0,
    0,
    0,
    0.5
  ); /* Reducido de 0.6 a 0.5 para mayor visibilidad del fondo */
  backdrop-filter: blur(3px); /* Reducido de 5px a 3px para menos desenfoque */
}

.menu-container {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 520px;
  background: rgba(0, 0, 0, 0.3); /* Reducida opacidad de 0.5 a 0.3 */
  backdrop-filter: blur(0px); /* Reducido de 15px a 10px */
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6); /* Reducida intensidad de sombra */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Reducido contorno blanco */
  color: white;
}

#menu-screen {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%; /* Asegura que ocupe el 100% de la altura de la ventana */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden; /* Evita el scroll vertical en el componente */
}

.card {
  background: url("/assets/3.jpg") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}

/* Contenedor del modelo adaptado */
.model-container {
  width: 100%;
  height: clamp(40vh, 60%, 70vh);
  position: relative;
  top: clamp(10vh, 25%, 30vh);
  background-color: transparent;
}

model-viewer {
  width: 100%;
  height: 100%;
  background-color: transparent;
  touch-action: none;
}

/* Loader */
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
  padding: clamp(1rem, 4vw, 2.5rem);
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
  font-size: clamp(1rem, 2.5vw, 1.5rem);
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
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
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
  top: 50%;
  right: clamp(0.5rem, 2vw, 1rem);
  transform: translateY(-50%);
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  cursor: pointer;
  border-radius: 5px;
}

.add-to-cart-button.in-cart {
  background-color: #22c55e;
}

/* Encabezado */
.header-container {
  position: absolute;
  top: 1px;
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
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: white;
  text-shadow: 0.5px 0.5px 0 white, -0.5px -0.5px 0 white;
  margin-bottom: clamp(5px, 1vh, 10px);
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
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: float 3s ease-in-out infinite;
  margin-bottom: 5px;
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

/* Ajustes para desktop */
@media (min-width: 768px) {
  #menu-screen {
    position: relative;
    width: 420px;
    height: 670px;
  }
}
</style>
