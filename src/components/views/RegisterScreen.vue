<template>
  <div id="register-screen">
    <div class="register-container">
      <div class="register-header">
        <div class="titulo-caligrafico">Tu Restaurante</div>
        <div class="subtitulo">Crear Cuenta</div>
      </div>

      <div class="register-content">
        <form class="register-form" @submit.prevent="handleSubmit">
          <div v-if="serverError" class="error-message">
            {{ serverError }}
          </div>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <BaseInput
            id="nombre"
            label="Nombre Completo"
            v-model="formData.nombre"
            placeholder="Ingresa tu nombre completo"
            :error="v$.nombre.$errors[0]?.$message"
            @blur="v$.nombre.$touch"
          />

          <BaseInput
            id="cedula"
            label="Cédula"
            v-model="formData.cedula"
            placeholder="Ingresa tu cédula"
            :error="v$.cedula.$errors[0]?.$message"
            @blur="v$.cedula.$touch"
          />

          <BaseInput
            id="telefono"
            label="Teléfono"
            v-model="formData.telefono"
            placeholder="Ingresa tu teléfono"
            :error="v$.telefono.$errors[0]?.$message"
            @blur="v$.telefono.$touch"
          />

          <BaseInput
            id="correo"
            type="email"
            label="Correo Electrónico"
            v-model="formData.correo"
            placeholder="Ingresa tu correo electrónico"
            :error="v$.correo.$errors[0]?.$message"
            @blur="v$.correo.$touch"
          />

          <BaseInput
            id="direccion"
            label="Dirección (Opcional)"
            v-model="formData.direccion"
            placeholder="Ingresa tu dirección"
            :error="v$.direccion.$errors[0]?.$message"
            @blur="v$.direccion.$touch"
          />

          <PasswordInput
            id="password"
            label="Contraseña"
            v-model="formData.password"
            placeholder="Crea una contraseña segura"
            :error="v$.password.$errors[0]?.$message"
            @blur="v$.password.$touch"
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirmar Contraseña"
            v-model="formData.confirmPassword"
            placeholder="Repite tu contraseña"
            :error="v$.confirmPassword.$errors[0]?.$message"
            @blur="v$.confirmPassword.$touch"
          />

          <button type="submit" class="register-button" :disabled="isLoading">
            <span v-if="isLoading">Creando cuenta...</span>
            <span v-else>Crear Cuenta</span>
          </button>
        </form>

        <div class="register-divider">
          <span>o</span>
        </div>

        <div class="login-link">
          ¿Ya tienes cuenta?
          <router-link to="/login">Inicia sesión</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import PasswordInput from "../ui/PasswordInput.vue";
import { useRegistrationForm } from "../../composables/useRegistrationForm.js";

const { formData, v$, isLoading, serverError, successMessage, handleSubmit } =
  useRegistrationForm();
</script>

<style scoped>
#register-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/3.jpg") no-repeat center center;
  background-size: cover;
  z-index: 2000;
}

#register-screen::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.success-message {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.register-container {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 480px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  max-height: 90vh;
  overflow-y: auto;
}

.register-header {
  text-align: center;
  margin-bottom: 25px;
}

.titulo-caligrafico {
  font-family: "Dancing Script", cursive;
  font-size: 2.5rem;
  color: white;
  text-shadow: 0.5px 0.5px 0 white, -0.5px -0.5px 0 white;
  margin-bottom: 5px;
}

.subtitulo {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

.register-form {
  margin-bottom: 25px;
}

.register-button {
  width: 100%;
  padding: 12px;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.register-button:hover:not(:disabled) {
  background: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
}

.register-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.register-divider {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.6);
}

.register-divider::before,
.register-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.register-divider span {
  padding: 0 15px;
  font-size: 0.9rem;
}

.login-link {
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.login-link a {
  color: #38bdf8;
  text-decoration: none;
  transition: color 0.2s ease;
}

.login-link a:hover {
  color: #7dd3fc;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .register-container {
    width: 95%;
    padding: 20px;
  }
}
</style>
