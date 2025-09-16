<script setup>
import { ref } from "vue";

import DataTable from "../../components/datatable/DataTable.vue";
import BaseMenu from "../../components/basemenu/BaseMenu.vue";
import backgroundImage from "../../assets/3.jpg";

import { useCrudHandlers } from "../../composables/useCrudHandlers";

const { handleCreate, handleUpdate, handleDelete, handleError } =
  useCrudHandlers("Empresa");

// Configuración de columnas para la tabla de platos
const columns = ref([
  {
    label: "ID",
    field: "id",
    type: "number",
    sortable: true,
    filterable: false,
    editable: false,
  },
  {
    label: "Nombre",
    field: "nombre",
    type: "text",
    sortable: true,
    filterable: true,
    required: true,
    editable: true,
  },
  {
    label: "Direccion",
    field: "direccion",
    type: "text",
    sortable: true,
    filterable: true,
    required: true,
    editable: true,
    visible: false,
  },
  {
    label: "Logo",
    field: "logo",
    type: "file",
    accept: ".jpg, .jpeg, .png",
    uploadLabel: "Seleccionar logo de la empresa (.jpg, .jpeg, .png)",
    sortable: false,
    filterable: false,
    editable: true,
    visible: false,
  },
  {
    label: "Teléfono",
    field: "telefono",
    type: "text",
    sortable: true,
    filterable: true,
    required: true,
    editable: true,
  },
  {
    label: "Rif",
    field: "rif",
    type: "text",
    sortable: true,
    filterable: true,
    required: true,
    editable: true,
  },
]);
</script>

<template>
  <BaseMenu :background-image="backgroundImage" :blur-amount="'5px'">
    <DataTable
      title="Gestión de Empresa"
      :columns="columns"
      endpoint="/api/empresa"
      search-placeholder="Buscar Empresa..."
      :editable="true"
      :deletable="true"
      :creatable="true"
      @on-create="handleCreate"
      @on-update="handleUpdate"
      @on-delete="handleDelete"
      @on-error="handleError"
    />
  </BaseMenu>
</template>
