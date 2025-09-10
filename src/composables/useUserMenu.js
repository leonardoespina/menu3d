// useUserMenu.js
import { ref } from "vue";

export function useUserMenu() {
  const isUserMenuOpen = ref(false);
  
  const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
  };
  
  const closeUserMenu = () => {
    isUserMenuOpen.value = false;
  };
  
  return {
    isUserMenuOpen,
    toggleUserMenu,
    closeUserMenu
  };
}