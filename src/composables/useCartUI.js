// useCartUI.js
import { ref } from "vue";

export function useCartUI() {
  const isCartOpen = ref(false);
  
  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };
  
  return {
    isCartOpen,
    toggleCart
  };
}