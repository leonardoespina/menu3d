<script setup>
import { ref } from "vue";

import DataTable from "../../components/datatable/DataTable.vue";
import BaseMenu from "../../components/basemenu/BaseMenu.vue";
import backgroundImage from "../../assets/3.jpg";

import { useCrudHandlers } from "../../composables/useCrudHandlers";

const { handleCreate, handleUpdate, handleDelete, handleError } =
  useCrudHandlers("Bancos");

// Configuración de columnas para la tabla de platos
const columns = ref([
  {
    label: "ID",
    field: "id",
    type: "number",
    sortable: true,
    filterable: false,
    editable: false,
    visible: true,
  },
  {
    label: "Nombre",
    field: "nombre",
    type: "text",
    sortable: true,
    filterable: true,
    required: true,
    editable: true,
    visible: true,
  },
  {
    label: "Tipo Pago",
    field: "tipo_pago",
    type: "select",
    options: [
      { label: "Pago Movil", value: "pago_movil" },
      { label: "Transferencia", value: "transferencia" },
      { label: "Efectivo", value: "efectivo" },
      { label: "Zelle", value: "zelle" },
      { label: "Bitcoin", value: "bitcoin" },
      { label: "Criptomoneda", value: "criptomoneda" },
    ],
    sortable: true,
    filterable: true,
    required: true,
    editable: true,
    visible: true,
  },
  {
    label: "Nro. Cuenta",
    field: "numero_cta",
    type: "text",
    required: true,
    editable: true,
    visible: false,
  },
  {
    label: "Cédula/RIF",
    field: "cedula_asociada",
    type: "text",
    required: true,
    editable: true,
    visible: false,
  },
  {
    label: "Tipo Cuenta",
    field: "tipo_cuenta",
    type: "select",
    required: true,
    options: [
      { label: "Ahorro", value: "ahorro" },
      { label: "Corriente", value: "corriente" },
    ],
    editable: true,
    visible: false,
  },
  {
    label: "Teléfono",
    field: "telefono",
    type: "text",
    required: true,
    editable: true,
    visible: false,
  },
  {
    label: "Email",
    field: "email",
    type: "email",
    required: true,
    editable: true,
    visible: false,
  },
  {
    label: "Banco Asociado",
    field: "banco_asociado",
    type: "select",
    required: true,
    editable: true,
    visible: false,
    options: [
      {
        label: "Banco de Venezuela, S.A. Banco Universal",
        value: "0102",
      },
      {
        label: "Venezolano de Crédito, S.A. Banco Universal",
        value: "0104",
      },
      {
        label: "Mercantil, C.A. Banco Universal",
        value: "0105",
      },
      {
        label: "Banco Provincial, S.A. Banco Universal",
        value: "0108",
      },
      {
        label: "Banco del Caribe, C.A. Banco Universal",
        value: "0114",
      },
      {
        label: "Banco Exterior, C.A. Banco Universal",
        value: "0115",
      },
      {
        label: "Banco Occidental de Descuento, Banco Universal",
        value: "0116",
      },
      {
        label: "Banco Caroní, C.A. Banco Universal",
        value: "0128",
      },
      {
        label: "Banesco Banco Universal, C.A.",
        value: "0134",
      },
      {
        label: "Banco Sofitasa, Banco Universal",
        value: "0137",
      },
      {
        label: "Banco Plaza, Banco Universal",
        value: "0138",
      },
      {
        label: "100% Banco, Banco Universal",
        value: "0156",
      },
      {
        label: "Banco Agrícola de Venezuela, C.A.",
        value: "0166",
      },
      {
        label:
          "Banco Bicentenario del Pueblo, de la Clase Obrera, Mujer y Comunas, Banco Universal, C.A.",
        value: "0169",
      },
      {
        label: "Banco Activo, C.A. Banco Universal",
        value: "0171",
      },
      {
        label: "Banplus, C.A. Banco Universal",
        value: "0174",
      },
      {
        label:
          "Banco de la Fuerza Armada Nacional Bolivariana, Banco Universal, C.A.",
        value: "0177",
      },
      {
        label: "Banco Nacional de Crédito, C.A.",
        value: "0191",
      },
    ],
  },
]);

const formColumnFilter = (column, formData) => {
  const tipoPago = formData.tipo_pago;
  const field = column.field;

  // Campos que siempre son visibles en el formulario
  if (["id", "nombre", "tipo_pago"].includes(field)) {
    return true;
  }

  if (tipoPago === "transferencia") {
    return [
      "numero_cta",
      "cedula_asociada",
      "tipo_cuenta",
      "banco_asociado",
    ].includes(field);
  }

  if (tipoPago === "pago_movil") {
    return ["cedula_asociada", "telefono", "banco_asociado"].includes(field);
  }

  // Para otros tipos de pago como efectivo, zelle, etc.
  if (tipoPago && tipoPago !== "transferencia" && tipoPago !== "pago_movil") {
    return ["email"].includes(field);
  }

  // Si no hay tipo de pago seleccionado, no mostrar campos adicionales
  return false;
};
</script>

<template>
  <BaseMenu :background-image="backgroundImage" :blur-amount="'5px'">
    <DataTable
      title="Gestión de Bancos"
      :columns="columns"
      endpoint="/api/bancos"
      search-placeholder="Buscar Banco..."
      :editable="true"
      :deletable="true"
      :creatable="true"
      :column-filter="formColumnFilter"
      @on-create="handleCreate"
      @on-update="handleUpdate"
      @on-delete="handleDelete"
      @on-error="handleError"
    />
  </BaseMenu>
</template>
