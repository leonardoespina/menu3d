<template>
  <transition name="glass-fade">
    <div v-if="isOpen" class="checkout-screen">
      <!-- Overlay de fondo con efecto de partículas suavizado -->
      <div class="particles-overlay">
        <div
          class="particle"
          v-for="i in 20"
          :key="i"
          :style="particleStyle(i)"
        ></div>
      </div>

      <!-- Panel de checkout rediseñado -->
      <div class="checkout-panel" @mousemove="handleMouseMove">
        <!-- Header -->
        <header class="checkout-header">
          <div class="header-content">
            <div class="title-with-icon">
              <span class="cart-icon">🛒</span>
              <h2>Completar Pedido</h2>
            </div>
            <button
              class="clear-cart-btn"
              @click="clearCart"
              v-if="cartStore.items.length > 0"
            >
              <span class="trash-icon">🗑️</span>
              Limpiar
            </button>
          </div>
          <button class="close-btn" @click="closePanel">×</button>
        </header>

        <!-- Contenido -->
        <main class="checkout-main">
          <!-- Datos del Cliente -->
          <section class="customer-data">
            <h3>
              <span class="section-icon">👤</span>
              Tus Datos
            </h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="nombreCliente">Nombre Completo *</label>
                <input
                  type="text"
                  id="nombreCliente"
                  v-model="customerData.nombreCliente"
                  placeholder="Ingresa tu nombre completo"
                  :class="{ error: errors.nombreCliente }"
                />
                <span class="error-text" v-if="errors.nombreCliente">{{
                  errors.nombreCliente
                }}</span>
              </div>

              <div class="form-group">
                <label for="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  v-model="customerData.telefono"
                  placeholder="Ej: 0412-1234567"
                  :class="{ error: errors.telefono }"
                />
                <span class="error-text" v-if="errors.telefono">{{
                  errors.telefono
                }}</span>
              </div>

              <div class="form-group full-width">
                <label for="direccion">Dirección de Entrega *</label>
                <textarea
                  id="direccion"
                  v-model="customerData.direccion"
                  placeholder="Ingresa tu dirección completa para la entrega"
                  rows="3"
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

          <!-- Resumen del Pedido -->
          <section class="order-summary">
            <h3>
              <span class="section-icon">📋</span>
              Resumen del Pedido
            </h3>
            <div class="order-items-container">
              <div
                v-for="(item, i) in cartStore.items"
                :key="i"
                class="order-item-card"
              >
                <div class="item-details">
                  <span class="item-name">{{ item.title }}</span>
                  <div class="item-meta">
                    <span class="item-quantity"
                      >Cantidad: {{ item.quantity }}</span
                    >
                    <span class="item-price">{{
                      formatPrice(item.price * item.quantity)
                    }}</span>
                  </div>
                </div>
                <button class="remove-item-btn" @click="removeItem(item)">
                  ×
                </button>
              </div>
            </div>
            <div class="order-total">
              <span>Total a pagar</span>
              <span class="total-price">{{
                formatPrice(cartStore.cartTotal)
              }}</span>
            </div>
          </section>

          <!-- Selección de método de pago -->
          <section class="payment-methods">
            <h3>
              <span class="section-icon">💳</span>
              Método de Pago
            </h3>

            <div class="payment-options">
              <div
                v-for="bank in paymentStore.bancos"
                :key="bank.id"
                class="payment-option"
                :class="{ selected: selectedBankId === bank.id }"
                @click="selectBank(bank.id)"
              >
                <div class="bank-info">
                  <h4>{{ bank.nombre }}</h4>
                  <p>{{ bank.tipo_cuenta }} - {{ bank.cedula_rif }}</p>
                  <p v-if="bank.tipo_pago.toLowerCase() === 'pago móvil'">
                    Pago Móvil: {{ bank.telefono }} - {{ bank.banco_asociado }}
                  </p>
                  <p v-else>{{ bank.tipo_pago }}</p>
                </div>
                <div class="checkmark" v-if="selectedBankId === bank.id">✓</div>
              </div>

              <div v-if="paymentStore.loading" class="loading-banks">
                Cargando métodos de pago...
              </div>

              <div
                v-if="!paymentStore.loading && paymentStore.bancos.length === 0"
                class="no-banks"
              >
                No hay métodos de pago disponibles
              </div>
            </div>

            <!-- Referencia de Pago -->
            <div
              class="payment-reference"
              v-if="selectedBankId && requiresReference"
            >
              <h4>
                <span class="section-icon">🔢</span>
                Referencia de Pago *
              </h4>
              <div class="reference-input">
                <input
                  type="text"
                  v-model="paymentReference"
                  placeholder="Número de referencia, comprobante o últimos 4 dígitos"
                  :class="{ error: errors.referenciaPago }"
                />
                <span class="error-text" v-if="errors.referenciaPago">{{
                  errors.referenciaPago
                }}</span>
                <small class="help-text">
                  Ingresa el número de referencia que obtuviste al realizar el
                  pago
                </small>
              </div>
            </div>

            <div class="payment-error" v-if="paymentError">
              {{ paymentError }}
            </div>
            <div class="payment-error" v-if="paymentStore.error">
              {{ paymentStore.error }}
            </div>
          </section>
        </main>

        <!-- Footer -->
        <footer class="checkout-footer">
          <div class="footer-content">
            <button class="cancel-btn" @click="closePanel">
              Seguir Comprando
            </button>
            <button
              class="confirm-btn"
              @click="confirmOrder"
              :disabled="!isFormValid || paymentStore.loading"
            >
              <span class="btn-icon">✓</span>
              Confirmar Pedido - {{ formatPrice(cartStore.cartTotal) }}
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { useCartStore } from "../stores/cart";
import { usePaymentStore } from "../stores/payment";
import { post } from "../api";

const emit = defineEmits(["close", "orderConfirmed"]);
const cartStore = useCartStore();
const paymentStore = usePaymentStore();
const isOpen = ref(false);

// Datos del cliente
const customerData = reactive({
  nombreCliente: "",
  telefono: "",
  direccion: "",
  observaciones: "",
});

const selectedBankId = ref(null);
const paymentReference = ref("");
const paymentError = ref("");
const errors = reactive({});
const lightPosition = ref(
  "radial-gradient(circle at 50% 50%, rgba(74, 144, 226, 0.1), transparent 70%)"
);

// Computed properties
const requiresReference = computed(() => {
  if (!selectedBankId.value) return false;
  const selectedBank = paymentStore.bancos.find(
    (bank) => bank.id === selectedBankId.value
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

const isFormValid = computed(() => {
  return (
    customerData.nombreCliente.trim() &&
    customerData.telefono.trim() &&
    customerData.direccion.trim() &&
    selectedBankId.value &&
    (!requiresReference.value || paymentReference.value.trim())
  );
});

// Validación de formulario
const validateForm = () => {
  let isValid = true;
  errors.nombreCliente = "";
  errors.telefono = "";
  errors.direccion = "";
  errors.referenciaPago = "";

  if (!customerData.nombreCliente.trim()) {
    errors.nombreCliente = "El nombre es obligatorio";
    isValid = false;
  }

  if (!customerData.telefono.trim()) {
    errors.telefono = "El teléfono es obligatorio";
    isValid = false;
  } else if (!/^[0-9+\-\s()]{10,15}$/.test(customerData.telefono)) {
    errors.telefono = "Ingresa un teléfono válido";
    isValid = false;
  }

  if (!customerData.direccion.trim()) {
    errors.direccion = "La dirección es obligatoria";
    isValid = false;
  }

  if (requiresReference.value && !paymentReference.value.trim()) {
    errors.referenciaPago = "La referencia de pago es obligatoria";
    isValid = false;
  }

  return isValid;
};

// Efectos de partículas
const particleStyle = (index) => {
  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 8 + 8;
  const delay = Math.random() * 3;
  const opacity = Math.random() * 0.3 + 0.1;

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity: opacity,
  };
};

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  lightPosition.value = `radial-gradient(circle at ${x}% ${y}%, rgba(74, 144, 226, 0.08), transparent 70%)`;
};

let animationFrame;
const animateParticles = () => {
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle) => {
    const currentTop = parseFloat(particle.style.top);
    particle.style.top = `${(currentTop + 0.02) % 100}%`;
  });
  animationFrame = requestAnimationFrame(animateParticles);
};

onMounted(() => {
  animateParticles();
});

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
});

const openPanel = async () => {
  isOpen.value = true;
  document.body.style.overflow = "hidden";

  // Resetear formulario
  Object.assign(customerData, {
    nombreCliente: "",
    telefono: "",
    direccion: "",
    observaciones: "",
  });
  selectedBankId.value = null;
  paymentReference.value = "";
  paymentError.value = "";
  Object.keys(errors).forEach((key) => delete errors[key]);

  // Cargar métodos de pago usando la store
  try {
    await paymentStore.fetchBancos();
  } catch (error) {
    console.error("Error loading banks:", error);
  }
};

const closePanel = () => {
  isOpen.value = false;
  document.body.style.overflow = "";
  emit("close");
};

const selectBank = (bankId) => {
  selectedBankId.value = bankId;
  paymentError.value = "";
  errors.referenciaPago = "";
};

const confirmOrder = async () => {
  if (!validateForm()) return;

  try {
    const selectedBank = paymentStore.bancos.find(
      (bank) => bank.id === selectedBankId.value
    );

    const orderData = {
      nombreCliente: customerData.nombreCliente,
      telefono: customerData.telefono,
      direccion: customerData.direccion,
      observaciones: customerData.observaciones,
      metodoPago: selectedBank.tipo_pago,
      referenciaPago: paymentReference.value,
      bancoId: selectedBankId.value,
      total: cartStore.cartTotal,
      platos: cartStore.items.map((item) => ({
        platoId: item.id,
        cantidad: item.quantity,
        precio: item.price,
      })),
    };

    // Usar la función post del archivo api.js
    const result = await post("/api/pedidos", orderData);

    // Abrir WhatsApp
    window.open(`https://wa.me/?text=${result.mensajeWhatsApp}`, "_blank");

    emit("orderConfirmed", {
      orderId: result.pedido.id,
      total: cartStore.cartTotal,
      customer: customerData.nombreCliente,
      bank: selectedBank.nombre,
    });

    cartStore.clearCart();
    closePanel();

    // Mostrar confirmación
    alert(
      `¡Pedido #${result.pedido.id} realizado con éxito! Se abrirá WhatsApp para que envíes el comprobante.`
    );
  } catch (error) {
    paymentError.value = error.message || "Error al procesar el pedido";
    console.error("Order error:", error);
  }
};

const clearCart = () => {
  if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
    cartStore.clearCart();
  }
};

const removeItem = (item) => {
  cartStore.removeItem(item);
};

const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);

defineExpose({ openPanel, closePanel });
</script>

<style scoped>
/* Efectos de transición mejorados */
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

/* Fondo con efecto de partículas suavizado */
.checkout-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-end;
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

/* Panel principal rediseñado */
.checkout-panel {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  overflow-y: auto;
  z-index: 3;
  background: rgba(248, 250, 252, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  color: #1f2937;
}

/* Header */
.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-icon {
  font-size: 1.5rem;
}

.checkout-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #1f2937;
}

.clear-cart-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-cart-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  transform: translateY(-1px);
}

.close-btn {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  transform: rotate(90deg);
}

/* Main */
.checkout-main {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto;
  background: transparent;
}

.order-summary h3,
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

/* Tarjetas de productos */
.order-items-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.order-item-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.order-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #d1d5db;
}

.item-details {
  flex: 1;
}

.item-name {
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  color: #1f2937;
  font-size: 1rem;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-quantity {
  font-size: 0.85rem;
  color: #6b7280;
}

.item-price {
  font-weight: 600;
  color: #059669;
}

.remove-item-btn {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.2s;
}

.remove-item-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.05);
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 20px 0;
  margin-top: 15px;
  border-top: 2px solid #e5e7eb;
  font-size: 1.3rem;
  color: #1f2937;
}

.total-price {
  color: #059669;
}

/* Métodos de pago */
.payment-methods {
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
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

.payment-error {
  color: #dc2626;
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
}

/* Footer */
.checkout-footer {
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.footer-content {
  display: flex;
  gap: 15px;
}

.cancel-btn,
.confirm-btn {
  flex: 1;
  padding: 16px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid #d1d5db;
  color: #4b5563;
}

.cancel-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.confirm-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #059669, #047857);
  color: white;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
  position: relative;
  overflow: hidden;
}

.confirm-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #047857, #065f46);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(5, 150, 105, 0.4);
}

.confirm-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.confirm-btn:disabled:hover {
  transform: none;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .checkout-panel {
    max-width: 100%;
  }

  .checkout-main {
    padding: 20px;
    gap: 24px;
  }

  .checkout-header {
    padding: 16px 20px;
  }

  .checkout-footer {
    padding: 16px 20px;
  }

  .footer-content {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .order-item-card {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .item-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .remove-item-btn {
    align-self: flex-end;
    margin-top: -40px;
  }
}

/* Scroll personalizado */
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

.customer-data {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
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

.form-group input,
.form-group textarea {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #dc2626;
}

.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 5px;
}

.help-text {
  color: #6b7280;
  font-size: 0.85rem;
  margin-top: 5px;
  font-style: italic;
}

/* Estilos para la sección de referencia de pago */
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

.reference-input input {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.reference-input input:focus {
  outline: none;
  border-color: #3b82f6;
}

.reference-input input.error {
  border-color: #dc2626;
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .customer-data {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .checkout-main {
    padding: 15px;
  }

  .customer-data {
    margin-bottom: 15px;
  }
}
</style>
