<!-- UserMenu.vue -->
<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth.js";
import IconButton from "../appbar/IconButton.vue";
import { useUserMenu } from "../../composables/useUserMenu.js";

const router = useRouter();
const authStore = useAuthStore();
const { isUserMenuOpen, toggleUserMenu, closeUserMenu } = useUserMenu();

const logout = () => {
  authStore.logout();
  closeUserMenu();
  router.push("/");
};

const navigateToLogin = () => {
  closeUserMenu();
  router.push("/login");
};
</script>

<template>
  <div class="user-menu-container">
    <IconButton @click="toggleUserMenu" aria-label="Menú de usuario">
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
    </IconButton>

    <transition name="fade-slide">
      <div v-if="isUserMenuOpen" class="user-menu-dropdown">
        <button
          v-if="authStore.isAuthenticated"
          class="menu-item"
          @click="logout"
        >
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

        <button v-else class="menu-item" @click="navigateToLogin">
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
</template>

<style scoped>
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
</style>
