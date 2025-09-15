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
import BaseMenu from "../../components/basemenu/BaseMenu.vue";

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
  <BaseMenu :background-image="backgroundImage" :blur-amount="'5px'">
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
  </BaseMenu>
</template>
