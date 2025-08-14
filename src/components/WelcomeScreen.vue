<script setup>
import { useMenuStore } from "../stores/menu";

const menuStore = useMenuStore();
</script>

<template>
  <div id="welcome-screen">
    <div class="welcome-content">
      <div class="titulo">Tu Restaurante</div>
      <div class="subtitulo">Bienvenidos</div>
      <div class="imagen-circular">
        <img src="/assets/3.jpg" alt="Plato principal" />
      </div>
      <div class="mensaje">Gracias por tu visita</div>
      <a href="#" class="btn" @click.prevent="menuStore.toggleShowWelcome"
        >Entrar</a
      >
      <div class="registro">
        ¿No tienes cuenta? <a href="#">Regístrate ahora</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#welcome-screen {
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s ease-in-out;
  background: url("/assets/3.jpg") no-repeat center center;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
}

#welcome-screen::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}

.welcome-content {
  position: relative;
  z-index: 2;
}

.welcome-content .titulo {
  font-family: "Dancing Script", cursive;
  font-size: 3.5rem;
  color: white;
  text-shadow: 0.5px 0.5px 0 white, -0.5px -0.5px 0 white;
  margin-bottom: 10px;
}

.welcome-content .subtitulo {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.imagen-circular {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.imagen-circular img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mensaje {
  margin: 15px 0;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
}

.btn {
  display: inline-block;
  background: #22c55e;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.btn:hover {
  transform: scale(1.05);
}

.registro {
  margin-top: 15px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.registro a {
  color: #38bdf8;
  text-decoration: none;
}

@media (min-width: 768px) {
  #welcome-screen {
    width: 450px;
    height: 700px;
    position: relative;
    border-radius: 12px;
    margin: 2rem;
  }
}
</style>
