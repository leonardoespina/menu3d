<!-- ToggleMenu.vue -->
<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const isMenuOpen = ref(false);
const router = useRouter();

// Computed property para verificar si el usuario es admin
const isAdmin = computed(() => {
  return (
    authStore.user &&
    (authStore.user.rol === "admin" || authStore.user.rol === "superadmin")
  );
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Navegar a la gestión de platos

// Emitir evento para el menú lateral (si es necesario)
const emit = defineEmits(["toggle-menu"]);
</script>

<template>
  <div class="toggle-menu-container">
    <!-- Botón de menú hamburguesa para todos los usuarios -->
    <button
      class="toggle-menu-button"
      @click="isAdmin ? toggleMenu() : $emit('toggle-menu')"
      aria-label="Abrir menú"
    >
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

    <!-- Menú desplegable solo para administradores -->
    <transition name="fade-slide">
      <div v-if="isAdmin && isMenuOpen" class="toggle-menu-dropdown">
        <router-link to="/admin/platos" class="menu-item">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>Gestión de Platos</span>
        </router-link>
        <router-link to="/admin/usuarios" class="menu-item">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Gestión de Usuarios</span>
        </router-link>
        <router-link to="/admin/categorias" class="menu-item">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="18" height="4"></rect>
            <rect x="3" y="10" width="18" height="4"></rect>
            <rect x="3" y="17" width="18" height="4"></rect>
          </svg>
          <span>Gestión de Categorías</span>
        </router-link>
        <router-link to="/admin/bancos" class="menu-item">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="18" height="4"></rect>
            <rect x="3" y="10" width="18" height="4"></rect>
            <rect x="3" y="17" width="18" height="4"></rect>
          </svg>
          <span>Gestion Banco</span>
        </router-link>
      </div>
    </transition>

    <!-- Overlay para cerrar el menú al hacer clic fuera -->
    <transition name="fade">
      <div
        v-if="isAdmin && isMenuOpen"
        class="menu-overlay"
        @click="closeMenu"
      ></div>
    </transition>
  </div>
</template>

<style scoped>
.toggle-menu-container {
  position: relative;
}

.toggle-menu-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.toggle-menu-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.toggle-menu-dropdown {
  position: absolute;
  top: 50px;
  left: 0;
  min-width: 180px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1001;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: -13px;
  width: 100%;
  padding: 12px 15px;
  color: rgb(0, 0, 0);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: transparent;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
