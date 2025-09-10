<!-- AppBarSearch.vue -->
<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: "Buscar..."
  }
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="updateValue"
    :placeholder="placeholder"
    class="search-input"
  />
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: 8px 15px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

@media (max-width: 768px) {
  .search-input {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}
</style>