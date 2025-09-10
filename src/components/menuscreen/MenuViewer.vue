<script setup>
import { ref, onMounted } from "vue";
import { UPLOADS_BASE_URL } from "../../api";

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  currentItem: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["interaction-start", "interaction-end"]);
const viewer = ref(null);

onMounted(() => {
  if (viewer.value) {
    viewer.value.addEventListener("load", () => {
      viewer.value.autoRotate = true;
    });
  }
});
</script>

<template>
  <div class="model-container">
    <div class="loader" v-if="isLoading">Cargando...</div>
    <model-viewer
      ref="viewer"
      :src="UPLOADS_BASE_URL + currentItem.imagen"
      alt="Modelo"
      ar
      camera-controls
      shadow-intensity="1"
      camera-orbit="0deg 90deg 1.5m"
      interaction-policy="allow-when-focused"
      touch-action="none"
      @touch-start="$emit('interaction-start')"
      @touch-end="$emit('interaction-end')"
      @mousedown="$emit('interaction-start')"
      @mouseup="$emit('interaction-end')"
    >
    </model-viewer>
    <slot></slot>
  </div>
</template>

<style scoped>
.model-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  max-height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
}

model-viewer {
  width: 100%;
  height: 100%;
}

.loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: bold;
}

@media (max-width: 768px) {
  .model-container {
    max-height: 52vh;
    flex: 1;
  }
}

@media (max-height: 700px) {
  .model-container {
    max-height: 45vh;
  }
}

@media (max-width: 360px) and (max-height: 640px) {
  .model-container {
    max-height: 48vh;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .model-container {
    max-height: 58vh;
  }
}
</style>
