<template>
  <footer class="checkout-footer">
    <div class="footer-content">
      <button class="cancel-btn" @click="handleCancel">
        {{ cancelButtonText }}
      </button>
      <button
        class="confirm-btn"
        @click="$emit('next')"
        :disabled="!isStepValid || loading"
      >
        <span class="btn-icon">
          {{ currentStep === stepsCount ? "✓" : "→" }}
        </span>
        {{ confirmButtonText }}
      </button>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  stepsCount: {
    type: Number,
    default: 2,
  },
  isStepValid: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["previous", "next", "cancel"]);

const cancelButtonText = computed(() => {
  return props.currentStep > 1 ? "Atrás" : "Cancelar";
});

const confirmButtonText = computed(() => {
  return props.currentStep === props.stepsCount
    ? `Confirmar Pedido - ${formatPrice(props.total)}`
    : "Continuar";
});

const handleCancel = () => {
  if (props.currentStep > 1) {
    emit("previous");
  } else {
    emit("cancel");
  }
};

const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
</script>
<style scoped>
.checkout-footer {
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  position: sticky;
  bottom: 0;
  z-index: 10;
  border-radius: 0 0 16px 16px;
}

.footer-content {
  display: flex;
  gap: 16px;
}

.nav-button {
  flex: 1;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
}

.cancel-btn {
  background: white;
  border: 2px solid #e5e7eb;
  color: #4b5563;
  font-weight: 500;
}

.cancel-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.confirm-btn {
  background: linear-gradient(135deg, #059669, #047857);
  color: white;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.confirm-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #047857, #065f46);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(5, 150, 105, 0.4);
}

.confirm-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3);
}

.confirm-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2);
}

.btn-icon {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

/* Efecto de carga */
.confirm-btn:disabled::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .checkout-footer {
    padding: 16px 20px;
  }

  .footer-content {
    flex-direction: column;
    gap: 12px;
  }

  .nav-button {
    padding: 14px 16px;
    min-height: 48px;
    font-size: 0.95rem;
  }

  .btn-icon {
    font-size: 1.1rem;
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .checkout-footer {
    padding: 12px 16px;
  }

  .nav-button {
    padding: 12px 14px;
    min-height: 44px;
    font-size: 0.9rem;
  }

  .confirm-btn {
    font-size: 0.85rem;
  }

  .btn-icon {
    font-size: 1rem;
  }
}

/* Animaciones */
.nav-button {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estados de focus para accesibilidad */
.nav-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.cancel-btn:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.confirm-btn:focus {
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.4);
}
</style>
