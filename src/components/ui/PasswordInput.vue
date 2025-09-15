<template>
  <div class="form-group" :class="`theme-${theme}`">
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

    <!-- Criterios de validación de contraseña -->
    <div v-if="enableValidation" class="password-criteria">
      <p :class="{ valid: passwordCriteria.minLength }">
        <svg
          v-if="passwordCriteria.minLength"
          class="check-icon"
          viewBox="0 0 24 24"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        <svg v-else class="check-icon" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
        Al menos 8 caracteres
      </p>
      <p :class="{ valid: passwordCriteria.hasUppercase }">
        <svg
          v-if="passwordCriteria.hasUppercase"
          class="check-icon"
          viewBox="0 0 24 24"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        <svg v-else class="check-icon" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
        Una letra mayúscula (A-Z)
      </p>
      <p :class="{ valid: passwordCriteria.hasLowercase }">
        <svg
          v-if="passwordCriteria.hasLowercase"
          class="check-icon"
          viewBox="0 0 24 24"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        <svg v-else class="check-icon" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
        Una letra minúscula (a-z)
      </p>
      <p :class="{ valid: passwordCriteria.hasNumber }">
        <svg
          v-if="passwordCriteria.hasNumber"
          class="check-icon"
          viewBox="0 0 24 24"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        <svg v-else class="check-icon" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
        Al menos un número (0-9)
      </p>
      <p :class="{ valid: passwordCriteria.hasSpecial }">
        <svg
          v-if="passwordCriteria.hasSpecial"
          class="check-icon"
          viewBox="0 0 24 24"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        <svg v-else class="check-icon" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
        Un carácter especial (!@#$...)
      </p>
    </div>

    <!-- Campo de confirmación de contraseña -->
    <template v-if="confirm">
      <label v-if="confirmLabel" :for="`${id}-confirm`" class="confirm-label">{{
        confirmLabel
      }}</label>
      <div class="password-input-container">
        <input
          :id="`${id}-confirm`"
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="passwordConfirmation"
          :placeholder="confirmPlaceholder"
          class="password-input"
          :class="{ 'has-error': confirmationError }"
        />
        <button
          type="button"
          class="password-toggle"
          @click="showConfirmPassword = !showConfirmPassword"
          tabindex="-1"
        >
          <svg
            v-if="showConfirmPassword"
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
      <div v-if="confirmationError" class="error-text">
        {{ confirmationError }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  id: String,
  label: String,
  modelValue: String,
  placeholder: String,
  error: String,
  theme: {
    type: String,
    default: "dark", // 'dark' o 'light'
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  confirmLabel: {
    type: String,
    default: "Confirmar Contraseña",
  },
  confirmPlaceholder: {
    type: String,
    default: "Vuelve a escribir la contraseña",
  },
  enableValidation: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "blur", "update:valid"]);

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordConfirmation = ref("");
const confirmationError = ref("");

// Criterios de validación
const passwordCriteria = ref({
  minLength: false,
  hasUppercase: false,
  hasLowercase: false,
  hasNumber: false,
  hasSpecial: false,
});

const isPasswordStrong = computed(() => {
  return Object.values(passwordCriteria.value).every(Boolean);
});

const validatePassword = (password) => {
  if (!password) {
    Object.keys(passwordCriteria.value).forEach(
      (key) => (passwordCriteria.value[key] = false)
    );
    return;
  }
  passwordCriteria.value.minLength = password.length >= 8;
  passwordCriteria.value.hasUppercase = /[A-Z]/.test(password);
  passwordCriteria.value.hasLowercase = /[a-z]/.test(password);
  passwordCriteria.value.hasNumber = /\d/.test(password);
  passwordCriteria.value.hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (props.enableValidation) {
      validatePassword(newValue);
    }
    // La validación de coincidencia se dispara en el siguiente watch
  }
);

watch([() => props.modelValue, passwordConfirmation, isPasswordStrong], () => {
  let passwordsMatch = true;
  if (props.confirm) {
    if (props.modelValue && props.modelValue !== passwordConfirmation.value) {
      confirmationError.value = "Las contraseñas no coinciden.";
      passwordsMatch = false;
    } else {
      confirmationError.value = "";
      passwordsMatch = true;
    }
  }

  const isComponentValid =
    (props.enableValidation ? isPasswordStrong.value : true) && passwordsMatch;

  emit("update:valid", isComponentValid);
});
</script>

<style>
/* Definición de variables de tema */
.form-group.theme-dark {
  --input-label-color: rgba(255, 255, 255, 0.9);
  --input-bg-color: rgba(255, 255, 255, 0.1);
  --input-border-color: rgba(255, 255, 255, 0.3);
  --input-text-color: white;
  --input-placeholder-color: rgba(255, 255, 255, 0.6);
  --input-focus-border-color: #22c55e;
  --input-focus-shadow-color: rgba(34, 197, 94, 0.5);
  --input-error-border-color: #ef4444;
  --input-error-shadow-color: rgba(239, 68, 68, 0.3);
  --input-toggle-color: rgba(255, 255, 255, 0.7);
  --input-toggle-hover-bg: rgba(255, 255, 255, 0.1);
  --input-toggle-hover-color: white;
}

.form-group.theme-light {
  --input-label-color: #334155;
  --input-bg-color: #ffffff;
  --input-border-color: #e2e8f0;
  --input-text-color: #1e293b;
  --input-placeholder-color: #94a3b8;
  --input-focus-border-color: #2563eb;
  --input-focus-shadow-color: rgba(37, 99, 235, 0.15);
  --input-error-border-color: #dc2626;
  --input-error-shadow-color: rgba(220, 38, 38, 0.15);
  --input-toggle-color: #64748b;
  --input-toggle-hover-bg: #f1f5f9;
  --input-toggle-hover-color: #1e293b;
}
</style>

<style scoped>
.form-group {
  margin-bottom: 1.2rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--input-label-color);
}

.confirm-label {
  margin-top: 1rem; /* Espacio extra para el campo de confirmación */
}

.password-input-container {
  position: relative;
}

.password-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid var(--input-border-color);
  background: var(--input-bg-color);
  color: var(--input-text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  padding-right: 45px; /* Espacio para el botón de toggle */
}

.password-input::placeholder {
  color: var(--input-placeholder-color);
}

.password-input:focus {
  outline: none;
  border-color: var(--input-focus-border-color);
  box-shadow: 0 0 8px var(--input-focus-shadow-color);
  background: var(--input-bg-color); /* Mantenemos el fondo al hacer foco */
}

.password-input.has-error {
  border-color: var(--input-error-border-color);
  box-shadow: 0 0 8px var(--input-error-shadow-color);
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--input-toggle-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle:hover {
  color: var(--input-toggle-hover-color);
  background: var(--input-toggle-hover-bg);
}

.error-text {
  color: var(--input-error-border-color);
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

.password-criteria {
  font-size: 0.8rem;
  margin-top: 0.8rem;
  color: var(--input-label-color);
  opacity: 0.8;
}

.password-criteria p {
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.password-criteria p.valid {
  color: var(--input-focus-border-color);
  opacity: 1;
}

.check-icon {
  width: 14px;
  height: 14px;
  margin-right: 8px;
  stroke-width: 2.5;
  stroke: currentColor;
  fill: none;
}

.password-criteria p:not(.valid) .check-icon {
  stroke: var(--input-error-border-color);
}
</style>
