<template>
  <nav class="step-navigation">
    <div
      v-for="(step, index) in steps"
      :key="step.id"
      class="step-item"
      :class="{
        active: currentStep === step.id,
        completed: currentStep > step.id,
      }"
      @click="$emit('step-change', step.id)"
    >
      <span class="step-number">{{ step.id }}</span>
      <span class="step-label">{{ step.label }}</span>

      <div v-if="index < steps.length - 1" class="step-divider"></div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
    default: () => [
      { id: 1, label: "Tus Datos" },
      { id: 2, label: "Pago" },
    ],
  },
});

defineEmits(["step-change"]);
</script>

<style scoped>
.step-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 24px 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.step-item.active {
  background: rgba(59, 130, 246, 0.1);
}

.step-item.completed .step-number {
  background: #10b981;
  color: white;
}

.step-item.completed:not(.active) {
  opacity: 0.7;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.step-item.active .step-number {
  background: #3b82f6;
  color: white;
}

.step-item.completed .step-number::after {
  content: "✓";
}

.step-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.3s ease;
}

.step-item.active .step-label {
  color: #3b82f6;
  font-weight: 600;
}

.step-divider {
  width: 60px;
  height: 2px;
  background: #e5e7eb;
  margin: 0 10px;
  position: relative;
}

.step-item.completed .step-divider {
  background: #10b981;
}

/* Efectos de hover */
.step-item:not(.active):hover {
  background: rgba(59, 130, 246, 0.05);
}

.step-item:not(.active):hover .step-number {
  background: #d1d5db;
}

.step-item:not(.active):hover .step-label {
  color: #4b5563;
}

/* Responsive */
@media (max-width: 768px) {
  .step-navigation {
    padding: 16px 20px 0;
  }

  .step-item {
    padding: 8px 12px;
  }

  .step-number {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }

  .step-label {
    font-size: 0.8rem;
  }

  .step-divider {
    width: 40px;
    margin: 0 8px;
  }
}

@media (max-width: 480px) {
  .step-navigation {
    padding: 12px 16px 0;
  }

  .step-item {
    padding: 6px 8px;
    flex-direction: row;
    gap: 8px;
  }

  .step-number {
    margin-bottom: 0;
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }

  .step-label {
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .step-divider {
    width: 20px;
    height: 2px;
    margin: 0 5px;
  }
}

/* Animaciones */
.step-item {
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
