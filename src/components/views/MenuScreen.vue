<script setup>
import { ref, onMounted } from "vue";
import { useMenuStore } from "../../stores/menu";
//import FilterComponent from "../../components/FilterComponent.vue";
import FilterComponent from "../../components/views/FilterComponent.vue";
import { useCartStore } from "../../stores/cart";
//import AppBar from "../../components/AppBar.vue";
import AppBar from "../views/AppBar.vue";
import MenuViewer from "../menuscreen/MenuViewer.vue";
import MenuItemInfo from "../menuscreen/MenuItemInfo.vue";
import MenuNavigation from "../menuscreen/MenuNavigation.vue";
import { useMenuInteraction } from "../../composables/useMenuInteraction.js";

const menuStore = useMenuStore();
const cartStore = useCartStore();
const viewer = ref(null);

const {
  cardInfo,
  triggerSlideUp,
  handleFilterInteractionStart,
  handleFilterInteractionEnd,
} = useMenuInteraction(menuStore, viewer);

onMounted(() => {
  menuStore.initializeFilter();
});

const handleToggleMenu = () => {
  console.log("Toggle menu clicked");
};
</script>

<template>
  <div id="menu-screen">
    <div class="menu-container">
      <AppBar @toggle-menu="handleToggleMenu" />

      <div class="filter-wrapper">
        <FilterComponent
          @interaction-start="handleFilterInteractionStart"
          @interaction-end="handleFilterInteractionEnd"
        />
      </div>

      <MenuViewer
        ref="viewer"
        :isLoading="menuStore.isLoading"
        :currentItem="menuStore.currentItem"
        @interaction-start="handleFilterInteractionStart"
        @interaction-end="handleFilterInteractionEnd"
      >
        <MenuNavigation
          @prev="menuStore.goToPrevItem"
          @next="menuStore.goToNextItem"
        />
      </MenuViewer>

      <div class="info-spacer"></div>

      <MenuItemInfo
        ref="cardInfo"
        :item="menuStore.currentItem"
        :isInCart="cartStore.isInCart(menuStore.currentItem)"
        @add-to-cart="cartStore.addItem"
      />
    </div>
  </div>
</template>

<style scoped>
/* Estilos base */
#menu-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/3.jpg") no-repeat center center;
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

.menu-container {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 720px;
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
  .menu-container {
    max-height: 100vh;
    overflow-y: auto;
  }
}

/* Para dispositivos muy pequeños en orientación vertical */
@media (max-width: 360px) and (max-height: 640px) {
  .menu-container {
    padding: 0.6rem;
    gap: 0.4rem;
  }

  .info-spacer {
    height: 0.3rem;
  }
}

/* Para tablets y dispositivos más grandes */
@media (min-width: 769px) and (max-width: 1024px) {
  /* Estilos específicos para tablets si es necesario */
}
</style>
