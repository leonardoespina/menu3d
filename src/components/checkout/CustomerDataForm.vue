<template>
  <section class="customer-data step-panel">
    <h3>
      <span class="section-icon">👤</span>
      Tus Datos
    </h3>
    <div class="form-grid">
      <BaseInput
        id="nombreCliente"
        label="Nombre Completo *"
        v-model="customerData.nombreCliente"
        placeholder="Ingresa tu nombre completo"
        :error="errors.nombreCliente"
        :light-theme="true"
        @blur="$emit('validate-field', 'nombreCliente')"
      />

      <BaseInput
        id="cedulaIdentidad"
        label="Cédula de Identidad"
        v-model="customerData.cedulaIdentidad"
        placeholder="Ej: V-12345678"
        :error="errors.cedulaIdentidad"
        :light-theme="true"
      />

      <BaseInput
        id="telefono"
        label="Teléfono *"
        type="tel"
        v-model="customerData.telefono"
        placeholder="Ej: 0412-1234567"
        :error="errors.telefono"
        :light-theme="true"
        @blur="$emit('validate-field', 'telefono')"
      />

      <div class="form-group full-width">
        <label for="direccion">Dirección de Entrega *</label>
        <textarea
          id="direccion"
          v-model="customerData.direccion"
          placeholder="Ingresa tu dirección completa para la entrega"
          rows="3"
          @blur="$emit('validate-field', 'direccion')"
          :class="{ error: errors.direccion }"
        ></textarea>
        <span class="error-text" v-if="errors.direccion">{{
          errors.direccion
        }}</span>
      </div>

      <div class="form-group full-width">
        <label for="observaciones">Observaciones (Opcional)</label>
        <textarea
          id="observaciones"
          v-model="customerData.observaciones"
          placeholder="Instrucciones especiales, referencias, etc."
          rows="2"
        ></textarea>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";

defineProps({
  customerData: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
});

defineEmits(["validate-field"]);
</script>

<style scoped>
.customer-data {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.customer-data h3 {
  color: #1f2937;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e7eb;
}

.section-icon {
  font-size: 1.2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 8px;
  color: #374151;
  font-size: 0.9rem;
}

.form-group textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
  background: white;
  color: #1f2937;
  resize: vertical;
}

.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 5px;
}

/* Animaciones */
.step-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .customer-data {
    padding: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .customer-data {
    padding: 16px;
  }

  .customer-data h3 {
    font-size: 1.1rem;
  }
}
</style>
