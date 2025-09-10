<!-- CartDropdown.vue -->
<script setup>
import CartItem from "../shoppingcart/CartItem.vue";
import CartActions from "../shoppingcart/CartActions.vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
  cartTotal: {
    type: Number,
    default: 0,
  },
});

defineEmits([
  "toggle",
  "increase-quantity",
  "decrease-quantity",
  "remove-item",
  "clear-cart",
  "checkout",
]);
</script>

<template>
  <transition name="fade-slide">
    <div class="cart-dropdown" v-if="isOpen">
      <div class="cart-header">
        <h3>Tu Pedido</h3>
        <button class="close-btn" @click="$emit('toggle')">×</button>
      </div>

      <div class="cart-items" v-if="items.length > 0">
        <CartItem
          v-for="(item, index) in items"
          :key="index"
          :item="item"
          :index="index"
          @increase-quantity="$emit('increase-quantity', index)"
          @decrease-quantity="$emit('decrease-quantity', index)"
          @remove-item="$emit('remove-item', index)"
        />
      </div>

      <div class="empty-cart" v-else>No existe Pedido</div>

      <CartActions
        v-if="items.length > 0"
        :cart-total="cartTotal"
        @clear-cart="$emit('clear-cart')"
        @checkout="$emit('checkout')"
      />
    </div>
  </transition>
</template>

<style scoped>
.cart-dropdown {
  position: absolute;
  top: 60px;
  right: 0;
  width: 320px;
  max-height: 500px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
}

.cart-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.2);
}

.cart-items {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.empty-cart {
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
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

@media (max-width: 768px) {
  .cart-dropdown {
    width: 280px;
    right: -10px;
  }
}
</style>
