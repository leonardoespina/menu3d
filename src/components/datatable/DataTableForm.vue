<script setup>
import { ref, onMounted, watch, computed } from "vue";

const props = defineProps({
  isOpen: Boolean,
  columns: Array,
  item: Object,
  isEditMode: Boolean,
});

const emit = defineEmits(["close", "submit"]);

const formData = ref({});
const errors = ref({});

// Obtener el nombre real del campo para formulario
const getFormFieldName = (column) => {
  return column.formField || column.field;
};

// Inicializar formulario
const initializeForm = () => {
  formData.value = {};
  errors.value = {};

  // Inicializar todos los campos del formulario
  props.columns.forEach((column) => {
    const fieldName = getFormFieldName(column);

    if (props.isEditMode && props.item && props.item[fieldName] !== undefined) {
      formData.value[fieldName] = props.item[fieldName];
    } else {
      formData.value[fieldName] = column.defaultValue || "";
    }
  });

  // Para campos de relación, también inicializar el campo de visualización si existe
  if (props.isEditMode && props.item) {
    props.columns.forEach((column) => {
      if (column.formField && column.formField !== column.field) {
        formData.value[column.field] = props.item[column.field];
      }
    });
  }
};

// Validar formulario
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  props.columns.forEach((column) => {
    if (column.editable !== false && column.required) {
      const fieldName = getFormFieldName(column);
      const value = formData.value[fieldName];

      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errors.value[fieldName] = `${column.label} es requerido`;
        isValid = false;
      }
    }
  });

  return isValid;
};

// Preparar datos para enviar
const prepareSubmitData = () => {
  const submitData = {};

  props.columns.forEach((column) => {
    const fieldName = getFormFieldName(column);

    // Incluir todos los campos excepto los no editables (a menos que sea el id)
    if (
      (column.editable !== false || fieldName === "id") &&
      formData.value[fieldName] !== undefined
    ) {
      submitData[fieldName] = formData.value[fieldName];
    }
  });

  return submitData;
};

// Manejar cambio en campos select
const handleSelectChange = (column, value) => {
  const fieldName = getFormFieldName(column);
  formData.value[fieldName] = value;

  // Si hay un campo de visualización, actualizarlo también
  if (column.formField && column.formField !== column.field) {
    const selectedOption = column.options.find((opt) => opt.value === value);
    if (selectedOption) {
      formData.value[column.field] = selectedOption.label;
    }
  }
};

// Obtener valor actual para select
const getSelectValue = (column) => {
  const fieldName = getFormFieldName(column);
  return formData.value[fieldName] || "";
};

// Manejar envío del formulario
const handleSubmit = () => {
  if (validateForm()) {
    const submitData = prepareSubmitData();
    emit("submit", submitData);
  }
};

// Cerrar modal
const closeModal = () => {
  emit("close");
};

// Reiniciar formulario cuando se abre el modal
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      initializeForm();
    }
  }
);

onMounted(initializeForm);
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ isEditMode ? "Editar" : "Crear" }} Registro</h3>
        <button @click="closeModal" class="close-button">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="form">
          <div
            v-for="column in columns"
            :key="column.field"
            class="form-group"
            :class="{ 'not-editable': column.editable === false }"
          >
            <label :for="column.field">
              {{ column.label }}{{ column.required ? " *" : "" }}
              <span v-if="column.editable === false" class="read-only-badge"
                >(Solo lectura)</span
              >
            </label>

            <!-- Campos no editables -->
            <template v-if="column.editable === false">
              <input
                :type="column.type || 'text'"
                :id="column.field"
                :value="formData[getFormFieldName(column)]"
                disabled
                class="disabled-field"
              />
            </template>

            <!-- Campos select con formField diferente -->
            <template
              v-else-if="
                column.type === 'select' &&
                column.formField &&
                column.formField !== column.field
              "
            >
              <select
                :id="column.field"
                :value="getSelectValue(column)"
                @change="handleSelectChange(column, $event.target.value)"
                :class="{ error: errors[getFormFieldName(column)] }"
              >
                <option value="">Seleccionar...</option>
                <option
                  v-for="option in column.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </template>

            <!-- Campos normales -->
            <template v-else>
              <input
                v-if="
                  !column.type ||
                  column.type === 'text' ||
                  column.type === 'email' ||
                  column.type === 'number'
                "
                :type="column.type || 'text'"
                :id="column.field"
                v-model="formData[getFormFieldName(column)]"
                :class="{ error: errors[getFormFieldName(column)] }"
              />

              <textarea
                v-else-if="column.type === 'textarea'"
                :id="column.field"
                v-model="formData[getFormFieldName(column)]"
                :class="{ error: errors[getFormFieldName(column)] }"
                :rows="column.rows || 3"
              ></textarea>

              <select
                v-else-if="column.type === 'select'"
                :id="column.field"
                v-model="formData[getFormFieldName(column)]"
                :class="{ error: errors[getFormFieldName(column)] }"
              >
                <option value="">Seleccionar...</option>
                <option
                  v-for="option in column.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>

              <input
                v-else-if="column.type === 'date'"
                type="date"
                :id="column.field"
                v-model="formData[getFormFieldName(column)]"
                :class="{ error: errors[getFormFieldName(column)] }"
              />
            </template>

            <div v-if="errors[getFormFieldName(column)]" class="error-message">
              {{ errors[getFormFieldName(column)] }}
            </div>
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancelar</button>
        <button @click="handleSubmit" class="submit-button">
          {{ isEditMode ? "Actualizar" : "Crear" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos existentes... */

/* Nuevos estilos para campos no editables */
.not-editable {
  opacity: 0.7;
}

.read-only-badge {
  font-size: 0.7rem;
  color: #64748b;
  margin-left: 0.5rem;
  font-style: italic;
}

.disabled-field {
  background-color: #f8fafc;
  color: #64748b;
  cursor: not-allowed;
  border-color: #e2e8f0;
}

.disabled-field:focus {
  border-color: #e2e8f0;
  box-shadow: none;
}

/* Estilos existentes permanecen igual */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.25s ease;
  border: 1px solid #f1f5f9;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid #f1f5f9;
  background: #fafafa;
}

.modal-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.close-button {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  padding: 6px;
  color: #64748b;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: #f1f5ff;
  color: #2563eb;
}

.modal-body {
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: 500;
  color: #334155;
  font-size: 0.9rem;
}

input,
textarea,
select {
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  color: #1e293b;
  transition: all 0.2s ease;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

input.error,
textarea.error,
select.error {
  border-color: #dc2626;
}

.error-message {
  color: #dc2626;
  font-size: 0.8rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #f1f5f9;
  background: #fafafa;
}

.cancel-button {
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.cancel-button:hover {
  background: #f1f5ff;
  border-color: #93c5fd;
  color: #2563eb;
}

.submit-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.submit-button:hover {
  background: #1e40af;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 10px;
  }

  .modal-footer {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .cancel-button,
  .submit-button {
    width: 100%;
  }
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
</style>
