<script setup>
import { ref, onMounted, defineExpose } from "vue";

defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  isInCart: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["add-to-cart"]);
const cardInfo = ref(null);

const triggerSlideUp = () => {
  if (cardInfo.value && cardInfo.value.classList) {
    cardInfo.value.classList.add("slide-up");
    setTimeout(() => {
      if (cardInfo.value && cardInfo.value.classList) {
        cardInfo.value.classList.remove("slide-up");
      }
    }, 500);
  }
};

// Asegurarse de que el elemento esté disponible después del montaje
onMounted(() => {
  // La referencia se establece automáticamente mediante ref="cardInfo"
});

defineExpose({
  triggerSlideUp,
});
</script>

<template>
  <div class="card-info" ref="cardInfo">
    <div class="card-title">{{ item.nombre }}</div>
    <div class="card-price">{{ item.precio }}</div>
    <div class="card-rating">
      <span>★ 4.5 (6,986)</span>
    </div>
    <div class="card-ingredients">
      {{ item.descripcion }}
    </div>
    <button
      class="add-to-cart-button"
      @click="
        $emit('add-to-cart', {
          ...item,
          title: item.nombre,
          price: item.precio,
        })
      "
      :class="{ 'in-cart': isInCart }"
    >
      {{ isInCart ? "Added to Cart" : "Add to Cart" }}
    </button>
  </div>
</template>

<style scoped>
.card-info {
  padding: clamp(1rem, 4vw, 1.5rem);
  position: relative;
  margin-top: 0.5rem;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  transform: translateY(0);
  opacity: 1;
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}

.slide-up {
  animation: slideUp 0.5s ease-in-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.card-title {
  font-size: clamp(2rem, 2.5vw, 1.5rem);
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: white;
}

.card-price {
  color: #22c55e;
  font-weight: bold;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  margin-bottom: 0.5rem;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(0.7rem, 1.8vw, 0.9rem);
}

.card-ingredients {
  font-size: clamp(0.7rem, 1.8vw, 0.9rem);
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-right: 90px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.add-to-cart-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: clamp(0.4rem, 1.5vw, 0.8rem) clamp(0.8rem, 2vw, 1.2rem);
  text-align: center;
  position: absolute;
  bottom: clamp(1rem, 3vw, 1.5rem);
  right: clamp(1rem, 3vw, 1.5rem);
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  cursor: pointer;
  border-radius: 5px;
  z-index: 2;
}

.add-to-cart-button.in-cart {
  background-color: #22c55e;
}

@media (max-width: 768px) {
  .card-info {
    margin-top: 0.3rem;
    padding: 0.8rem;
  }

  .card-ingredients {
    margin-right: 80px;
  }

  .add-to-cart-button {
    bottom: 0.6rem;
    right: 0.6rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-height: 700px) {
  .card-info {
    padding: 0.8rem;
  }
}

@media (max-width: 360px) and (max-height: 640px) {
  .card-info {
    padding: 0.6rem;
  }

  .card-ingredients {
    padding-right: 70px;
    font-size: 0.75rem;
    margin-right: 70px;
  }

  .add-to-cart-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
    bottom: 0.5rem;
    right: 0.5rem;
  }
}
</style>
