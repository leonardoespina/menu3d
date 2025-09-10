<!-- ShoppingCart.vue -->
<script setup>
import { ref } from "vue";
import { useCartStore } from "../../stores/cart.js";
import CheckoutPanel from "../../components//views/CheckoutPanel.vue";
import CartIcon from "../../components/shoppingcart/CartIcon.vue";
import CartDropdown from "../../components/shoppingcart/CartDropdown.vue";
import { useCartUI } from "../../composables/useCartUI.js";

const checkoutPanelRef = ref(null);
const cartStore = useCartStore();
const { isCartOpen, toggleCart } = useCartUI();

const checkout = () => {
  checkoutPanelRef.value?.openPanel();
};
</script>

<template>
  <div class="shopping-cart-container">
    <CartIcon :item-count="cartStore.itemCount" @click="toggleCart" />

    <CartDropdown
      :is-open="isCartOpen"
      :items="cartStore.items"
      :cart-total="cartStore.cartTotal"
      @toggle="toggleCart"
      @increase-quantity="
        cartStore.updateQuantity($event, cartStore.items[$event].quantity + 1)
      "
      @decrease-quantity="
        (index) => {
          const newQuantity = cartStore.items[index].quantity - 1;
          cartStore.updateQuantity(index, newQuantity);
        }
      "
      @remove-item="cartStore.removeItem"
      @clear-cart="cartStore.clearCart"
      @checkout="checkout"
    />

    <CheckoutPanel ref="checkoutPanelRef" @close="isCartOpen = false" />
  </div>
</template>

<style scoped>
.shopping-cart-container {
  position: absolute;
  top: 10px;
  right: 46px;
  z-index: 1000;
}
</style>
