<template>
  <transition name="glass-fade">
    <div v-if="isOpen" class="checkout-screen">
      <div class="particles-overlay">
        <div
          class="particle"
          v-for="i in 20"
          :key="i"
          :style="particleStyle(i)"
        ></div>
      </div>

      <div class="checkout-panel" @mousemove="handleMouseMove">
        <CheckoutHeader :cart-items-count="cartStore.items.length" />

        <StepNavigation
          :current-step="currentStep"
          :steps="steps"
          @step-change="setCurrentStep"
        />

        <main class="checkout-main">
          <transition name="fade" mode="out-in">
            <CustomerDataForm
              v-if="currentStep === 1"
              v-model:customer-data="customerData"
              v-model:errors="errors"
              @validate-field="validateField"
            />

            <div v-else-if="currentStep === 2" class="payment-step step-panel">
              <OrderSummary
                :items="cartStore.items"
                :total="cartStore.cartTotal"
                @remove-item="removeItem"
              />

              <PaymentMethods
                :banks="paymentStore.bancos"
                :loading="paymentStore.loading"
                :selected-bank-id="selectedBankId"
                :payment-reference="paymentReference"
                :errors="errors"
                @select-bank="selectBank"
                @update:payment-reference="paymentReference = $event"
                @validate-field="validateField"
              />
            </div>
          </transition>
        </main>

        <CheckoutFooter
          :current-step="currentStep"
          :is-step-valid="Boolean(isStepValid)"
          :loading="paymentStore.loading"
          :total="cartStore.cartTotal"
          @previous="handlePreviousStep"
          @next="handleNextStep"
          @cancel="closePanel"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps } from "vue";
import { useCartStore } from "../../stores/cart";
import { usePaymentStore } from "../../stores/payment";
import { useCheckout } from "../../composables/checkout/useCheckout";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

// Components
import CheckoutHeader from "../../components/checkout/CheckoutHeader.vue";
import StepNavigation from "../../components/checkout/StepNavigation.vue";
import CustomerDataForm from "../../components/checkout/CustomerDataForm.vue";
import OrderSummary from "../../components/checkout/OrderSummary.vue";
import PaymentMethods from "../../components/checkout/PaymentMethods.vue";
import CheckoutFooter from "../../components/checkout/CheckoutFooter.vue";

const emit = defineEmits(["close", "orderConfirmed"]);
const cartStore = useCartStore();
const paymentStore = usePaymentStore();

const {
  isOpen,
  currentStep,
  steps,
  customerData,
  selectedBankId,
  paymentReference,
  errors,

  isStepValid,
  openPanel,
  closePanel,
  setCurrentStep,
  validateField,
  handleNextStep,
  handlePreviousStep,
  selectBank,

  removeItem,
  particleStyle,
  handleMouseMove,
  animateParticles,
  cleanupAnimation,
} = useCheckout({ cartStore, paymentStore, emit });

onMounted(() => {
  animateParticles();
});

onUnmounted(() => {
  cleanupAnimation();
});

// Exponer métodos al padre si es necesario
defineExpose({ openPanel, closePanel });
</script>

<style scoped>
/* Estilos del CheckoutPanel (sin cambios) */
.glass-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-fade-enter-from,
.glass-fade-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.98);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.checkout-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.5);
}

.particles-overlay {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 15s infinite ease-in-out;
  pointer-events: none;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-15px) translateX(8px);
  }
  50% {
    transform: translateY(-25px) translateX(-8px);
  }
  75% {
    transform: translateY(-10px) translateX(12px);
  }
}

.checkout-panel {
  position: relative;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  width: 90%;
  max-width: 520px;
  height: auto;
  max-height: 90vh;
  margin: auto;
  overflow-y: auto;
  background: rgba(248, 250, 252, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #1f2937;
}

.checkout-main {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto;
  background: transparent;
}

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

.payment-step {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

@media (max-width: 768px) {
  .checkout-panel {
    max-width: 100%;
  }

  .checkout-main {
    padding: 20px;
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .checkout-main {
    padding: 15px;
  }
}

.checkout-main::-webkit-scrollbar {
  width: 6px;
}

.checkout-main::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.checkout-main::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.checkout-main::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
