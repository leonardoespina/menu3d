<template>
  <div id="menu-screen" :class="{ 'mobile-view': isMobile }">
    <div class="menu-container">
      <div class="info-spacer"></div>
      <slot name="header"></slot>
      <div class="content-wrapper">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps({
  backgroundImage: {
    type: String,
    default: "",
  },
  blurAmount: {
    type: String,
    default: "3px",
  },
});

const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

const menuStyle = computed(() => ({
  "background-image": props.backgroundImage
    ? `url(${props.backgroundImage})`
    : "",
  "--blur-amount": props.blurAmount,
}));
</script>

<style scoped>
/* Variables CSS para personalización */
#menu-screen {
  --blur-amount: 3px;
  --container-bg: rgba(0, 0, 0, 0.3);
  --container-border: 1px solid rgba(255, 255, 255, 0.2);
  --container-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  --text-color: rgb(0, 0, 0);
}

/* Estilos base */
#menu-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background-image, url("../../assets/3.jpg")) no-repeat
    center center;
  background-size: cover;
  z-index: 2000;
  padding: 1rem;
}

#menu-screen::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(var(--blur-amount));
}

.menu-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 720px;
  height: 97%;
  max-height: 100vh;
  background: var(--container-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--container-shadow);
  border: var(--container-border);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.info-spacer {
  height: 0.5rem;
}

/* Media queries para móviles */
#menu-screen.mobile-view {
  padding: 0;
  align-items: stretch;
}

#menu-screen.mobile-view .menu-container {
  width: 100%;
  max-width: none;
  max-height: none;
  height: 100%;
  border-radius: 0;
  padding: 0.8rem;
  gap: 0.6rem;
}

/* Scroll personalizado para navegadores WebKit */
.content-wrapper::-webkit-scrollbar {
  width: 6px;
}

.content-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.content-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

@media (max-height: 700px) {
  .menu-container {
    max-height: 100vh;
  }
}

/* Para dispositivos muy pequeños en orientación vertical */
@media (max-width: 360px) and (max-height: 640px) {
  .menu-container {
    padding: 0.6rem;
    gap: 0.4rem;
  }

  .info-spacer {
    height: 0.3rem;
  }
}
</style>
