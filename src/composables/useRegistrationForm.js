import { ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { useAuthStore } from "../stores/auth";

export function useRegistrationForm() {
  const authStore = useAuthStore();

  const formData = ref({
    nombre: "",
    cedula: "",
    telefono: "",
    correo: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  const isLoading = ref(false);
  const serverError = ref("");
  const successMessage = ref("");

  // Validaciones
  const rules = computed(() => ({
    nombre: {
      required: helpers.withMessage("El nombre es obligatorio", required),
    },
    cedula: {
      required: helpers.withMessage("La cédula es obligatoria", required),
    },
    telefono: {
      required: helpers.withMessage("El teléfono es obligatorio", required),
    },
    correo: {
      required: helpers.withMessage("El correo es obligatorio", required),
      email: helpers.withMessage("Debe ser un correo válido", email),
    },
    direccion: {},
    password: {
      required: helpers.withMessage("La contraseña es obligatoria", required),
      minLength: helpers.withMessage("Mínimo 6 caracteres", minLength(6)),
    },
    confirmPassword: {
      required: helpers.withMessage("Debe confirmar la contraseña", required),
      sameAs: helpers.withMessage(
        "Las contraseñas no coinciden",
        sameAs(formData.value.password)
      ),
    },
  }));

  const v$ = useVuelidate(rules, formData);

  const handleSubmit = async () => {
    serverError.value = "";
    successMessage.value = "";

    const isFormValid = await v$.value.$validate();

    if (!isFormValid) {
      return;
    }

    isLoading.value = true;

    try {
      // Preparar datos para enviar (sin confirmPassword)
      const { confirmPassword, ...userData } = formData.value;

      const result = await authStore.register(userData);

      if (result.success) {
        successMessage.value = "Cuenta creada exitosamente. Redirigiendo...";
        // Resetear formulario
        formData.value = {
          nombre: "",
          cedula: "",
          telefono: "",
          correo: "",
          direccion: "",
          password: "",
          confirmPassword: "",
        };
        v$.value.$reset();
      } else {
        serverError.value = result.error || "Error al crear la cuenta";
      }
    } catch (error) {
      serverError.value = "Error de conexión con el servidor";
      console.error("Registration error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    formData,
    v$,
    isLoading,
    serverError,
    successMessage,
    handleSubmit,
  };
}
