<template>
  <header class="checkout-header">
    <div class="header-content">
      <div class="title-with-icon">
        <span class="cart-icon">🛒</span>
        <h2>Completar Pedido</h2>
      </div>
    </div>
    <!-- Corregido -->
  </header>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  cartItemsCount: {
    type: Number,
    default: 0,
  },
});
</script>
<style scoped>
.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-icon {
  font-size: 1.5rem;
}

.checkout-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #1f2937;
}

.clear-cart-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-cart-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  transform: translateY(-1px);
}

.close-btn {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  transform: rotate(90deg);
}

/* Responsive */
@media (max-width: 768px) {
  .checkout-header {
    padding: 16px 20px;
  }

  .checkout-header h2 {
    font-size: 1.2rem;
  }

  .clear-cart-btn {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
}
</style>
