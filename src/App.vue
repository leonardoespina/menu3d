<script setup>
import { ref, onMounted } from "vue";
import { useMenuStore } from "./stores/menu";
import WelcomeScreen from "./components/WelcomeScreen.vue";
import MenuScreen from "./components/MenuScreen.vue";

const menuStore = useMenuStore();

// Cargar el script de model-viewer dinámicamente
onMounted(() => {
  const script = document.createElement("script");
  script.type = "module";
  script.src =
    "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
  document.head.appendChild(script);
});
</script>

<template>
  <div id="app-container">
    <WelcomeScreen v-if="menuStore.showWelcome" />
    <MenuScreen v-else />
  </div>
</template>

<style>
/* Estilos globales */
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background: #0f172a;
  color: #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

/* Clases de utilidad para gestión de la vista */
.hidden {
  display: none !important;
}

.visible {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Media queries para dispositivos de escritorio */
@media (min-width: 768px) {
  body {
    overflow: auto;
    height: 100vh;
  }
}

/* Importamos la fuente de Google */
</style>
