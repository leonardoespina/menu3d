<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>

<template>
  <button
    :class="['category-button', { active: isActive }]"
    @click="$emit('click')"
    :aria-pressed="isActive"
  >
    {{ category.nombre }}
  </button>
</template>

<style scoped>
.category-button {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  color: white;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.category-button.active {
  background: #22c55e;
  border-color: #22c55e;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
  font-weight: bold;
}
</style>
