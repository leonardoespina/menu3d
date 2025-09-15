<script setup>
import { onMounted } from "vue";
import { useUIStore } from "./stores/ui";
import ProgressBar from "./components/ui/ProgressBar.vue";
import Notifications from "./components/ui/Notifications.vue";

const uiStore = useUIStore();

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
  <div id="app">
    <ProgressBar v-if="uiStore.isLoading" />
    <div class="content-wrapper">
      <router-view />
      <Notifications />
    </div>
  </div>
</template>

<style scoped>
/* Estilos globales */
/* Estilos globales */
body {
  margin: 0;
  background: #0f172a;
  color: #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: hidden; /* Oculta el scroll vertical */
}

#app {
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra el contenido verticalmente */
}

.content-wrapper {
  width: 100%;
  max-width: 450px; /* Ancho del componente WelcomeScreen para desktop */
  padding: 0 20px;
  margin: 0 auto; /* Centra el contenedor horizontalmente */
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
</style>
