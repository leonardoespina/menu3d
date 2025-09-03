<template>
  <div class="form-group">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="['base-input', { 'has-error': error }]"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  type: {
    type: String,
    default: "text",
  },
  label: String,
  modelValue: [String, Number],
  placeholder: String,
  error: String,
});

defineEmits(["update:modelValue", "blur"]);
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

.base-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.base-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.base-input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

.base-input.has-error {
  border-color: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
}

.error-text {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}
</style>
