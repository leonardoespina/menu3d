<!-- IconButton.vue -->
<script setup>
defineProps({
  ariaLabel: {
    type: String,
    default: ""
  }
});

defineEmits(["click"]);
</script>

<template>
  <button 
    class="icon-button" 
    @click="$emit('click')"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.icon-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 31px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.icon-button svg {
  stroke: white;
}
</style>