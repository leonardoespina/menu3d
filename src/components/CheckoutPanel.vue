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

        <nav class="step-navigation">
          <div
            class="step-item"
            :class="{ active: currentStep === 1, completed: currentStep > 1 }"
            @click="currentStep = 1"
          >
            <span class="step-number">1</span>
            <span class="step-label">Tus Datos</span>
          </div>
          <div class="step-divider"></div>
          <div
            class="step-item"
            :class="{ active: currentStep === 2 }"
            @click="currentStep = 2"
          >
            <span class="step-number">2</span>
            <span class="step-label">Pago</span>
          </div>
        </nav>

        <main class="checkout-main">
          <transition name="fade" mode="out-in">
            <section class="customer-data step-panel" v-if="currentStep === 1">
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
                    @blur="validateField('nombreCliente')"
                    :class="{ error: errors.nombreCliente }"
                  />
                  <span class="error-text" v-if="errors.nombreCliente">{{
                    errors.nombreCliente
                  }}</span>
                </div>
                <div class="form-group">
                  <label for="cedulaIdentidad">Cédula de Identidad</label>
                  <input
                    type="text"
                    id="cedulaIdentidad"
                    v-model="customerData.cedulaIdentidad"
                    placeholder="Ej: V-12345678"
                    :class="{ error: errors.cedulaIdentidad }"
                  />
                  <span class="error-text" v-if="errors.cedulaIdentidad">{{
                    errors.cedulaIdentidad
                  }}</span>
                </div>

                <div class="form-group">
                  <label for="telefono">Teléfono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    v-model="customerData.telefono"
                    placeholder="Ej: 0412-1234567"
                    @blur="validateField('telefono')"
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
                    @blur="validateField('direccion')"
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

            <section
              class="payment-step step-panel"
              v-else-if="currentStep === 2"
            >
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
                        Pago Móvil: {{ bank.telefono }} -
                        {{ bank.banco_asociado }}
                      </p>
                      <p v-else>{{ bank.tipo_pago }}</p>
                    </div>
                    <div class="checkmark" v-if="selectedBankId === bank.id">
                      ✓
                    </div>
                  </div>

                  <div v-if="paymentStore.loading" class="loading-banks">
                    Cargando métodos de pago...
                  </div>

                  <div
                    v-if="
                      !paymentStore.loading && paymentStore.bancos.length === 0
                    "
                    class="no-banks"
                  >
                    No hay métodos de pago disponibles
                  </div>
                </div>

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
                      @blur="validateField('referenciaPago')"
                      :class="{ error: errors.referenciaPago }"
                    />
                    <span class="error-text" v-if="errors.referenciaPago">{{
                      errors.referenciaPago
                    }}</span>
                    <small class="help-text">
                      Ingresa el número de referencia que obtuviste al realizar
                      el pago
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
            </section>
          </transition>
        </main>

        <footer class="checkout-footer">
          <div class="footer-content">
            <button
              class="cancel-btn"
              @click="currentStep > 1 ? currentStep-- : closePanel()"
            >
              {{ currentStep > 1 ? "Atrás" : "Cancelar" }}
            </button>
            <button
              class="confirm-btn"
              @click="handleNextStep"
              :disabled="!isStepValid || paymentStore.loading"
            >
              <span class="btn-icon">
                {{ currentStep === 2 ? "✓" : "→" }}
              </span>
              {{
                currentStep === 2
                  ? `Confirmar Pedido - ${formatPrice(cartStore.cartTotal)}`
                  : "Continuar"
              }}
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
const currentStep = ref(1); // Control del paso actual

// Datos del cliente
const customerData = reactive({
  nombreCliente: "",
  telefono: "",
  cedulaIdentidad: "",
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

const isStepValid = computed(() => {
  if (currentStep.value === 1) {
    return (
      customerData.nombreCliente.trim() &&
      customerData.telefono.trim() &&
      customerData.direccion.trim()
    );
  }
  if (currentStep.value === 2) {
    return (
      selectedBankId.value &&
      (!requiresReference.value || paymentReference.value.trim())
    );
  }
  return false;
});

// Validación de formulario (por campo y total)
const validateField = (field) => {
  errors[field] = "";
  if (field === "nombreCliente" && !customerData.nombreCliente.trim()) {
    errors.nombreCliente = "El nombre es obligatorio";
  }
  if (field === "telefono") {
    if (!customerData.telefono.trim()) {
      errors.telefono = "El teléfono es obligatorio";
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(customerData.telefono)) {
      errors.telefono = "Ingresa un teléfono válido";
    }
  }
  if (field === "direccion" && !customerData.direccion.trim()) {
    errors.direccion = "La dirección es obligatoria";
  }
  if (
    field === "referenciaPago" &&
    requiresReference.value &&
    !paymentReference.value.trim()
  ) {
    errors.referenciaPago = "La referencia de pago es obligatoria";
  }
  // No se valida la cédula porque es opcional.
};

const validateAllFields = () => {
  validateField("nombreCliente");
  validateField("telefono");
  validateField("direccion");
  if (currentStep.value === 2) {
    validateField("referenciaPago");
  }
  return Object.values(errors).every((error) => !error);
};

const handleNextStep = () => {
  if (currentStep.value === 1) {
    if (validateAllFields()) {
      currentStep.value = 2;
    }
  } else if (currentStep.value === 2) {
    confirmOrder();
  }
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
  currentStep.value = 1; // Reiniciar al paso 1

  // Resetear formulario
  Object.assign(customerData, {
    nombreCliente: "",
    telefono: "",
    cedulaIdentidad: "",
    direccion: "",
    observaciones: "",
  });
  selectedBankId.value = null;
  paymentReference.value = "";
  paymentError.value = "";
  Object.keys(errors).forEach((key) => delete errors[key]);

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
  if (!validateAllFields()) {
    paymentError.value = "Por favor, completa todos los campos requeridos.";
    return;
  }

  try {
    const selectedBank = paymentStore.bancos.find(
      (bank) => bank.id === selectedBankId.value
    );

    const orderData = {
      nombreCliente: customerData.nombreCliente,
      telefono: customerData.telefono,
      cedulaIdentidad: customerData.cedulaIdentidad,
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

    const result = await post("/api/pedidos", orderData);

    window.open(`https://wa.me/?text=${result.mensajeWhatsApp}`, "_blank");

    emit("orderConfirmed", {
      orderId: result.pedido.id,
      total: cartStore.cartTotal,
      customer: customerData.nombreCliente,
      bank: selectedBank.nombre,
    });

    cartStore.clearCart();
    closePanel();

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
/* Estilos existentes */
@import "./CheckoutPanel.css";
</style>
