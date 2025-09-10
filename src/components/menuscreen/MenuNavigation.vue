<script setup>
defineEmits(['prev', 'next']);
</script>

<template>
  <div class="menu-swiper-button-prev" @click="$emit('prev')">
    &lt;
  </div>
  <div class="menu-swiper-button-next" @click="$emit('next')">
    &gt;
  </div>
</template>

<style scoped>
.menu-swiper-button-next,
.menu-swiper-button-prev {
  color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: rgba(0, 0, 0, 0.5);
  width: clamp(28px, 4vw, 36px);
  height: clamp(28px, 4vw, 36px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  margin: 0;
  cursor: pointer;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
}

.menu-swiper-button-next:hover,
.menu-swiper-button-prev:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.menu-swiper-button-next {
  right: clamp(5px, 1vw, 20px);
}

.menu-swiper-button-prev {
  left: clamp(5px, 1vw, 20px);
}
</style>