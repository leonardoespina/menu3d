<!-- CartIcon.vue -->
<script setup>
defineProps({
  itemCount: {
    type: Number,
    default: 0
  }
});

defineEmits(["click"]);
</script>

<template>
  <div class="cart-icon" @click="$emit('click')">
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18" />
      <path d="M16 10a4 4 0 1 1-8 0" />
    </svg>
    <span class="cart-badge" v-if="itemCount > 0">
      {{ itemCount }}
    </span>
  </div>
</template>

<style scoped>
.cart-icon {
  position: relative;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
  background: rgba(0, 0, 0, 0.5);
  width: 31px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cart-icon svg {
  width: 24px;
  height: 24px;
  color: white;
  transition: all 0.2s ease;
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
</style>