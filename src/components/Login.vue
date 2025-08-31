<template>
  <div id="login-screen">
    <div class="login-container">
      <div class="login-header">
        <div class="titulo-caligrafico">Tu Restaurante</div>
        <div class="subtitulo">Iniciar Sesión</div>
      </div>

      <div class="login-content">
        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Ingresa tu usuario"
              class="login-input"
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="Ingresa tu contraseña"
              class="login-input"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
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

          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
              Recordarme
            </label>
            <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" class="login-button">Iniciar Sesión</button>
        </form>

        <div class="login-divider">
          <span>o</span>
        </div>

        <div class="social-login">
          <button class="social-button google">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar con Google
          </button>
        </div>

        <div class="register-link">
          ¿No tienes cuenta? <a href="#">Regístrate ahora</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const handleLogin = () => {
  // Lógica de login (a implementar posteriormente)
  console.log("Login attempt:", {
    username: username.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};
</script>

<style scoped>
#login-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/3.jpg") no-repeat center center;
  background-size: cover;
  z-index: 2000;
}

#login-screen::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
}

.login-container {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 420px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
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

.login-form {
  margin-bottom: 25px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.login-input {
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

.login-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.login-input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 38px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  height: 18px;
  width: 18px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #22c55e;
  border-color: #22c55e;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-link {
  color: #38bdf8;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #7dd3fc;
  text-decoration: underline;
}

.login-button {
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
  margin-bottom: 20px;
}

.login-button:hover {
  background: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
}

.login-divider {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.6);
}

.login-divider::before,
.login-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.login-divider span {
  padding: 0 15px;
  font-size: 0.9rem;
}

.social-login {
  margin-bottom: 20px;
}

.social-button {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.register-link {
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.register-link a {
  color: #38bdf8;
  text-decoration: none;
  transition: color 0.2s ease;
}

.register-link a:hover {
  color: #7dd3fc;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-container {
    width: 95%;
    padding: 20px;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .forgot-link {
    margin-left: 26px;
  }
}
</style>
