<template>
  <section class="payment-methods">
    <h3>
      <span class="section-icon">💳</span>
      Método de Pago
    </h3>
    <div class="payment-options">
      <div
        v-for="bank in banks"
        :key="bank.id"
        class="payment-option"
        :class="{ selected: selectedBankId === bank.id }"
        @click="$emit('select-bank', bank.id)"
      >
        <div class="bank-info">
          <h4>{{ bank.nombre }}</h4>

          <!-- Caso Transferencia -->
          <div v-if="bank.tipo_pago.toLowerCase() === 'transferencia'">
            <p><strong>Cuenta:</strong> {{ bank.numero_cta }}</p>
            <p><strong>Tipo:</strong> {{ bank.tipo_cuenta }}</p>
            <p><strong>CI/Rif:</strong> {{ bank.cedula_asociada }}</p>
            <p><strong>Banco:</strong> {{ bank.banco_asociado }}</p>
          </div>

          <!-- Caso Pago Móvil -->
          <div
            v-else-if="
              bank.tipo_pago.toLowerCase() === 'pago_movil' ||
              bank.tipo_pago.toLowerCase() === 'pago_movil'
            "
          >
            <p><strong>CI/Rif:</strong> {{ bank.cedula_asociada }}</p>
            <p><strong>Teléfono:</strong> {{ bank.telefono }}</p>
            <p><strong>Banco:</strong> {{ bank.banco_asociado }}</p>
          </div>

          <!-- Otros casos -->
          <div v-else>
            <p><strong>Email:</strong> {{ bank.email }}</p>
            <p>
              <strong>Método:</strong>
              {{ bank.tipo_pago }}
            </p>
          </div>
        </div>
        <div class="checkmark" v-if="selectedBankId === bank.id">✓</div>
      </div>

      <div v-if="loading" class="loading-banks">
        Cargando métodos de pago...
      </div>

      <div v-if="!loading && banks.length === 0" class="no-banks">
        No hay métodos de pago disponibles
      </div>
    </div>

    <div class="payment-reference" v-if="selectedBankId && requiresReference">
      <h4>
        <span class="section-icon">🔢</span>
        Referencia de Pago *
      </h4>
      <div class="reference-input">
        <BaseInput
          type="text"
          :model-value="paymentReference"
          @update:model-value="$emit('update:payment-reference', $event)"
          placeholder="Número de referencia, comprobante o últimos 4 dígitos"
          :error="errors.referenciaPago"
          :light-theme="true"
          @blur="$emit('validate-field', 'referenciaPago')"
        />
        <small class="help-text">
          Ingresa el número de referencia que obtuviste al realizar el pago
        </small>
      </div>
    </div>

    <div class="payment-error" v-if="error">{{ error }}</div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import BaseInput from "../ui/BaseInput.vue";

// Definir las props correctamente
const props = defineProps({
  banks: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  selectedBankId: {
    type: [String, Number],
    default: null,
  },
  paymentReference: {
    type: String,
    default: "",
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
  error: {
    type: String,
    default: "",
  },
});

defineEmits(["select-bank", "update:payment-reference", "validate-field"]);

// Computed property corregida
const requiresReference = computed(() => {
  if (!props.selectedBankId) return false;

  const selectedBank = props.banks.find(
    (bank) => bank.id === props.selectedBankId
  );

  if (!selectedBank) return false;

  const methodsRequiringReference = [
    "transferencia",
    "pago_movil",
    "pago móvil",
    "zelle",
    "paypal",
  ];

  return methodsRequiringReference.includes(
    selectedBank.tipo_pago?.toLowerCase()
  );
});
</script>

<style scoped>
.payment-methods {
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
}

.payment-methods h3 {
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

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.payment-option:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.payment-option.selected {
  border-color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.05);
}

.bank-info h4 {
  margin: 0 0 5px 0;
  color: #1f2937;
  font-size: 1rem;
}

.bank-info p {
  margin: 3px 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.checkmark {
  color: #3b82f6;
  font-weight: bold;
  font-size: 1.2rem;
}

.loading-banks,
.no-banks {
  text-align: center;
  padding: 20px;
  color: #6b7280;
  font-style: italic;
}

.payment-reference {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.payment-reference h4 {
  margin: 0 0 10px 0;
  font-size: 1rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
}

.reference-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.help-text {
  color: #6b7280;
  font-size: 0.85rem;
  margin-top: 5px;
  font-style: italic;
}

.payment-error {
  color: #dc2626;
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
}
</style>
