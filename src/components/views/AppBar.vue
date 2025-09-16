<!-- AppBar.vue (modificado) -->
<script setup>
import { useRouter } from "vue-router";
import { useMenuStore } from "../../stores/menu.js";
import { useAuthStore } from "../../stores/auth.js";
import ShoppingCart from "../../components/views/ShoppingCart.vue";
import AppBarSearch from "../appbar/AppBarSearch.vue";
import UserMenu from "../appbar/UserMenu.vue";
import IconButton from "../appbar/IconButton.vue";
import ToggleMenu from "../appbar/ToggleMenu.vue"; // Importamos el nuevo componente

const router = useRouter();
const menuStore = useMenuStore();
const authStore = useAuthStore();

const navigateToHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="app-bar">
    <!-- Lado izquierdo: Menú hamburguesa (ahora con ToggleMenu) e ícono de inicio -->
    <div class="left-section">
      <ToggleMenu @toggle-menu="$emit('toggle-menu')" />
      <IconButton @click="navigateToHome" aria-label="Ir al inicio">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </IconButton>
    </div>

    <!-- Centro: Campo de búsqueda -->
    <div class="center-section">
      <AppBarSearch
        v-model="menuStore.searchQuery"
        @search="menuStore.setSearchQuery"
        placeholder="Buscar plato..."
      />
    </div>

    <!-- Lado derecho: Carrito y menú de usuario -->
    <div class="right-section">
      <ShoppingCart />
      <UserMenu />
    </div>
  </div>
</template>

<style scoped>
.app-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.left-section,
.center-section,
.right-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.center-section {
  flex: 1;
  max-width: 500px;
  margin: 0 15px;
  justify-content: center; /* Centra el contenido horizontalmente */
}

/* Media queries para responsividad */
@media (max-width: 768px) {
  .app-bar {
    padding: 10px 8px; /* Reducir el padding general */
  }

  .left-section,
  .right-section {
    gap: 5px; /* Reducir el espacio entre íconos */
    flex-shrink: 0; /* Evitar que estas secciones se encojan */
  }

  .center-section {
    flex: 1 1 auto; /* Permitir que se encoja si es necesario */
    min-width: 0; /* Evitar que el contenido interno desborde */
    margin: 0 8px;
    max-width: 200px; /* Limitar el ancho máximo en móviles */
  }
}
</style>
