<script setup>
import { ref } from "vue";

import DataTable from "../../components/datatable/DataTable.vue";
import BaseMenu from "../../components/basemenu/BaseMenu.vue";
import backgroundImage from "../../assets/3.jpg";

import { useCrudHandlers } from "../../composables/useCrudHandlers";

const { handleCreate, handleUpdate, handleDelete, handleError } =
  useCrudHandlers("Categorias");

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
    label: "Descripcion",
    field: "descripcion",
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
      title="Gestión de Categorías"
      :columns="columns"
      endpoint="/api/categorias"
      search-placeholder="Buscar Categoria..."
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
