<template>
  <div class="shopping-cart-container">
    <div class="cart-icon" @click="toggleCart">
      🛒
      <span class="cart-badge" v-if="cartStore.itemCount > 0">
        {{ cartStore.itemCount }}
      </span>
    </div>

    <transition name="fade-slide">
      <div class="cart-dropdown" v-if="isCartOpen">
        <div class="cart-header">
          <h3>Your Cart</h3>
          <button class="close-btn" @click="toggleCart">×</button>
        </div>

        <div class="cart-items" v-if="cartStore.items.length > 0">
          <div
            class="cart-item"
            v-for="(item, index) in cartStore.items"
            :key="index"
          >
            <div class="item-info">
              <span class="item-title">{{ item.title }}</span>
              <span class="item-price">{{ formatPrice(item.price) }}</span>
            </div>
            <div class="item-quantity">
              <button class="quantity-btn" @click="decreaseQuantity(index)">
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button class="quantity-btn" @click="increaseQuantity(index)">
                +
              </button>
              <button class="remove-btn" @click="cartStore.removeItem(index)">
                ×
              </button>
            </div>
          </div>
        </div>
        <div class="empty-cart" v-else>Your cart is empty</div>

        <div class="cart-footer" v-if="cartStore.items.length > 0">
          <div class="cart-total">
            Total: {{ formatPrice(cartStore.cartTotal) }}
          </div>
          <button class="checkout-btn" @click="checkout">Checkout</button>
          <button class="clear-btn" @click="cartStore.clearCart">
            Clear Cart
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
const isCartOpen = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const increaseQuantity = (index) => {
  const newQuantity = cartStore.items[index].quantity + 1;
  cartStore.updateQuantity(index, newQuantity);
};

const decreaseQuantity = (index) => {
  const newQuantity = cartStore.items[index].quantity - 1;
  cartStore.updateQuantity(index, newQuantity);
};

const checkout = () => {
  alert(`Checkout - Total: ${formatPrice(cartStore.cartTotal)}`);
  cartStore.clearCart();
  isCartOpen.value = false;
};

const formatPrice = (price) => {
  const numericPrice =
    typeof price === "string"
      ? parseFloat(price.replace(/[^0-9.]/g, ""))
      : Number(price);

  if (isNaN(numericPrice)) {
    return "Price not available";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericPrice);
};
</script>

<style scoped>
.shopping-cart-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.cart-icon {
  position: relative;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
  background: rgba(0, 0, 0, 0.5);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cart-icon:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.7);
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-dropdown {
  position: absolute;
  top: 60px;
  right: 0;
  width: 320px;
  max-height: 500px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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

.cart-item {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.item-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.item-title {
  font-weight: bold;
}

.item-price {
  color: #4caf50;
  font-weight: bold;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-btn {
  width: 25px;
  height: 25px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.quantity-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.remove-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: #ff4757;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.remove-btn:hover {
  transform: scale(1.2);
}

.empty-cart {
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

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
