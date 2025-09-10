<!-- CartItem.vue -->
<script setup>
import { usePriceFormatter } from "../../composables/usePriceFormatter.js";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

defineEmits(["increase-quantity", "decrease-quantity", "remove-item"]);

const { formatPrice } = usePriceFormatter();
</script>

<template>
  <div class="cart-item">
    <div class="item-info">
      <span class="item-title">{{ item.title }}</span>
      <span class="item-price">{{ formatPrice(item.price) }}</span>
    </div>
    <div class="item-quantity">
      <button class="quantity-btn" @click="$emit('decrease-quantity', index)">
        -
      </button>
      <span>{{ item.quantity }}</span>
      <button class="quantity-btn" @click="$emit('increase-quantity', index)">
        +
      </button>
      <button class="remove-btn" @click="$emit('remove-item', index)">×</button>
    </div>
  </div>
</template>

<style scoped>
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
</style>
