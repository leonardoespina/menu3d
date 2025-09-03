<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import ShoppingCart from "./ShoppingCart.vue";
import { useMenuStore } from "../stores/menu";
import { useAuthStore } from "../stores/auth"; // Importar el store de autenticación

const router = useRouter();
const menuStore = useMenuStore();
const authStore = useAuthStore(); // Inicializar el store de autenticación

const isUserMenuOpen = ref(false);

// Computed para verificar si el usuario está autenticado
const isAuthenticated = computed(() => authStore.isAuthenticated);

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const navigateToHome = () => {
  router.push("/");
};

const logout = () => {
  // Llamar a la acción de logout del store de autenticación
  authStore.logout();

  // Cerrar el menú de usuario
  isUserMenuOpen.value = false;

  // Redirigir a la pantalla de bienvenida
  router.push("/");
};
</script>

<template>
  <div class="app-bar">
    <!-- Lado izquierdo: Menú hamburguesa e ícono de inicio -->
    <div class="left-section">
      <button class="icon-button" @click="$emit('toggle-menu')">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M3 12h18M3 6h18M3 18h18"></path>
        </svg>
      </button>
      <button class="icon-button" @click="navigateToHome">
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
      </button>
    </div>

    <!-- Centro: Campo de búsqueda -->
    <div class="center-section">
      <input
        type="text"
        v-model="menuStore.searchQuery"
        @input="menuStore.setSearchQuery(menuStore.searchQuery)"
        placeholder="Buscar plato..."
        class="search-input"
      />
    </div>

    <!-- Lado derecho: Carrito y menú de usuario -->
    <div class="right-section">
      <ShoppingCart />

      <div class="user-menu-container">
        <button class="icon-button" @click="toggleUserMenu">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        <transition name="fade-slide">
          <div v-if="isUserMenuOpen" class="user-menu-dropdown">
            <!-- Mostrar el botón de logout solo si el usuario está autenticado -->
            <button v-if="isAuthenticated" class="menu-item" @click="logout">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Salir</span>
            </button>

            <!-- Opcional: Mostrar opción de login si no está autenticado -->
            <button v-else class="menu-item" @click="router.push('/login')">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>Iniciar Sesión</span>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Los estilos permanecen iguales */
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
}

.search-input {
  width: 100%;
  padding: 8px 15px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

.icon-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 31px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.icon-button svg {
  stroke: white;
}

.user-menu-container {
  position: relative;
}

.user-menu-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  min-width: 150px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 15px;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Animaciones */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Ajustes para el carrito existente */
.shopping-cart-container {
  position: relative;
  top: auto;
  right: auto;
}

/* Media queries para responsividad */
@media (max-width: 768px) {
  .search-input {
    font-size: 0.8rem;
    padding: 6px 12px;
  }

  .center-section {
    margin: 0 10px;
  }
}
</style>
