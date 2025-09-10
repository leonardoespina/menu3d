<!-- CartActions.vue -->
<script setup>
import { usePriceFormatter } from "../../composables/usePriceFormatter.js";

defineProps({
  cartTotal: {
    type: Number,
    default: 0,
  },
});

defineEmits(["clear-cart", "checkout"]);

const { formatPrice } = usePriceFormatter();
</script>

<template>
  <div class="cart-footer">
    <div class="cart-total">Total: {{ formatPrice(cartTotal) }}</div>
    <button class="checkout-btn" @click="$emit('checkout')">
      Realizar Pedido
    </button>
    <button class="clear-btn" @click="$emit('clear-cart')">
      Limpiar Pedido
    </button>
  </div>
</template>

<style scoped>
.cart-footer {
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
}

.cart-total {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 15px;
  text-align: right;
}

.checkout-btn {
  width: 100%;
  padding: 10px;
  background: rgba(76, 175, 80, 0.8);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 10px;
  transition: background 0.3s ease;
  backdrop-filter: blur(5px);
}

.checkout-btn:hover {
  background: rgba(62, 142, 65, 0.9);
}

.clear-btn {
  width: 100%;
  padding: 10px;
  background: rgba(255, 71, 87, 0.8);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
  backdrop-filter: blur(5px);
}

.clear-btn:hover {
  background: rgba(232, 65, 24, 0.9);
}
</style>
