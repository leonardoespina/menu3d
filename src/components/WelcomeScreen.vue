<script setup>
//import { useMenuStore } from "../stores/menu";
import { useRouter } from "vue-router";

//const menuStore = useMenuStore();

const router = useRouter();

const enterMenu = () => {
  router.push("/menu");
};
const enterLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div id="welcome-screen">
    <div class="login-container">
      <div class="titulo">Tu Restaurante</div>
      <div class="subtitulo">Bienvenidos</div>
      <div class="imagen-circular">
        <img src="../assets/3.jpg" alt="Plato principal" />
      </div>
      <div class="mensaje">Gracias por tu visita</div>
      <a href="#" class="btn" @click.prevent="enterMenu">Entrar</a>
      <div class="registro">
        <router-link to="/register">Regístrate ahora</router-link>
      </div>
      <div class="registro">
        Login <a href="#" @click.prevent="enterLogin">Accede Ahora</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#welcome-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/3.jpg") no-repeat center center;
  background-size: cover;
  z-index: 2000;
}

#welcome-screen::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(
    0,
    0,
    0,
    0.5
  ); /* Reducido de 0.6 a 0.5 para mayor visibilidad del fondo */
  backdrop-filter: blur(3px); /* Reducido de 5px a 3px para menos desenfoque */
}

.login-container {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 520px;
  background: rgba(0, 0, 0, 0.3); /* Reducida opacidad de 0.5 a 0.3 */
  backdrop-filter: blur(0px); /* Reducido de 15px a 10px */
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6); /* Reducida intensidad de sombra */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Reducido contorno blanco */
  color: white;
}

.titulo {
  font-family: "Dancing Script", cursive;
  font-size: 3.5rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); /* Mejorado contraste */
  margin-bottom: 10px;
  text-align: center;
}

.subtitulo {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.95); /* Aumentado contraste */
  text-align: center;
  font-weight: 500;
}

.imagen-circular {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.4); /* Reducido contorno */
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
  color: rgba(255, 255, 255, 0.9); /* Aumentado contraste */
  text-align: center;
  font-weight: 500;
}

.btn {
  display: block;
  margin: 0 auto;
  width: fit-content;
  background: #22c55e;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.registro {
  margin-top: 15px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9); /* Aumentado contraste */
  text-align: center;
}

.registro a {
  color: #93c5fd; /* Color más claro para mejor contraste con fondo */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.registro a:hover {
  color: #bfdbfe;
  text-decoration: underline;
}

@media (min-width: 768px) {
  /* Puedes añadir ajustes específicos para tablets aquí si es necesario */
}
</style>
