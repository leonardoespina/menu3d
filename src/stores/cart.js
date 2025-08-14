import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace(/[^0-9.]/g, ""))
          : Number(item.price);
      return total + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);
  });

  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const addItem = (item) => {
    // Verificamos si el item ya existe en el carrito
    const existingItem = items.value.find(
      (cartItem) => cartItem.id === item.id && cartItem.title === item.title
    );

    if (existingItem) {
      // Si existe, incrementamos la cantidad
      existingItem.quantity++;
    } else {
      // Si no existe, lo añadimos al carrito
      items.value.push({
        ...item,
        quantity: 1,
        price:
          typeof item.price === "string"
            ? parseFloat(item.price.replace(/[^0-9.]/g, ""))
            : Number(item.price),
      });
    }
  };

  const removeItem = (index) => {
    items.value.splice(index, 1);
  };

  const clearCart = () => {
    items.value = [];
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(index);
      return;
    }
    items.value[index].quantity = newQuantity;
  };

  const isInCart = (item) => {
    return items.value.some(
      (cartItem) => cartItem.id === item.id && cartItem.title === item.title
    );
  };

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    updateQuantity,
    cartTotal,
    itemCount,
    isInCart,
  };
});
