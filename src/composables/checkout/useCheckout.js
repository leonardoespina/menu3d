import { ref, reactive, computed } from "vue";
import api from "../../api";

export const useCheckout = ({ cartStore, paymentStore, emit }) => {
  const isOpen = ref(false);
  const currentStep = ref(1);
  const steps = [
    { id: 1, label: "Tus Datos" },
    { id: 2, label: "Pago" },
  ];

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

  // Declarar animationFrame aquí
  let animationFrame;

  // Computed properties
  const requiresReference = computed(() => {
    if (!selectedBankId.value) return false;
    const selectedBank = paymentStore.bancos.find(
      (bank) => bank.id === selectedBankId.value
    );
    if (!selectedBank) return false;

    const methodsRequiringReference = ["transferencia", "pago_movil"];
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

  // Methods
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

  const handlePreviousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };

  const setCurrentStep = (step) => {
    if (step >= 1 && step <= steps.length) {
      currentStep.value = step;
    }
  };

  const openPanel = async () => {
    isOpen.value = true;
    document.body.style.overflow = "hidden";
    currentStep.value = 1;

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
    paymentError.value = ""; // Limpiar errores previos

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

      const response = await api.post("/api/pedidos", orderData);
      const result = response.data;

      // Usar la URL de WhatsApp proporcionada por el backend
      window.open(result.whatsappUrl, "_blank");

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
      // El interceptor ya mostró la notificación al usuario.
      // Aquí solo manejamos la lógica específica del componente, como mostrar un mensaje local.
      paymentError.value = "No se pudo procesar el pedido. Inténtalo de nuevo.";
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

  const animateParticles = () => {
    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle) => {
      const currentTop = parseFloat(particle.style.top);
      particle.style.top = `${(currentTop + 0.02) % 100}%`;
    });
    animationFrame = requestAnimationFrame(animateParticles);
  };

  // Función para limpiar la animación
  const cleanupAnimation = () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  };

  return {
    isOpen,
    currentStep,
    steps,
    customerData,
    selectedBankId,
    paymentReference,
    errors,
    paymentError,
    isStepValid,
    openPanel,
    closePanel,
    setCurrentStep,
    validateField,
    handleNextStep,
    handlePreviousStep,
    selectBank,
    confirmOrder,
    clearCart,
    removeItem,
    particleStyle,
    handleMouseMove,
    animateParticles,
    cleanupAnimation,
    formatPrice,
  };
};
