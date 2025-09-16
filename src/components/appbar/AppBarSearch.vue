<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Buscar...",
  },
});

const emit = defineEmits(["update:modelValue", "search"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleSearch = () => {
  emit("search", props.modelValue);
};
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      :value="modelValue"
      @input="updateValue"
      @keydown.enter.prevent="handleSearch"
      :placeholder="placeholder"
      class="search-input"
    />
    <button @click="handleSearch" class="search-button" aria-label="Buscar">
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 8px 40px 8px 15px; /* Padding derecho para dejar espacio al ícono */
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-sizing: border-box; /* Asegura que el padding no afecte el ancho total */
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

.search-button {
  margin-left: -38px; /* Margen negativo para posicionar sobre el input */
  background: transparent;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
  z-index: 2; /* Asegura que el botón esté sobre el input */
}

.search-button:hover {
  color: white;
}

@media (max-width: 768px) {
  .search-input {
    font-size: 0.8rem;
    padding: 6px 35px 6px 12px;
  }
  .search-button {
    margin-left: -35px;
    padding: 4px;
  }
}
</style>
