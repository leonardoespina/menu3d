<template>
  <div class="form-group">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="password-input-container">
      <input
        :id="id"
        :type="showPassword ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        class="password-input"
        :class="{ 'has-error': error }"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
      />
      <button
        type="button"
        class="password-toggle"
        @click="showPassword = !showPassword"
        tabindex="-1"
      >
        <svg
          v-if="showPassword"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          ></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
    </div>
    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  id: String,
  label: String,
  modelValue: String,
  placeholder: String,
  error: String,
});

defineEmits(["update:modelValue", "blur"]);

const showPassword = ref(false);
</script>

<style scoped>
.form-group {
  margin-bottom: 1.2rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.password-input-container {
  position: relative;
}

.password-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  padding-right: 45px; /* Espacio para el botón de toggle */
}

.password-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.password-input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

.password-input.has-error {
  border-color: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.error-text {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}
</style>
