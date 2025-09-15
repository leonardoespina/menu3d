<script setup>
import { ref } from "vue";

import DataTable from "../../components/datatable/DataTable.vue";
import BaseMenu from "../../components/basemenu/BaseMenu.vue";
import backgroundImage from "../../assets/3.jpg";
import PasswordInput from "../../components/ui/PasswordInput.vue";

import { useCrudHandlers } from "../../composables/useCrudHandlers";

const { handleCreate, handleUpdate, handleDelete, handleError } =
  useCrudHandlers("Usuarios");

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
    label: "Telefono",
    field: "telefono",
    type: "number",
    sortable: true,
    filterable: true,
    required: true,
    editable: true,
  },
  {
    label: "Password",
    field: "password",
    component: PasswordInput, // Usar el componente personalizado
    componentProps: {
      theme: "light",
      confirm: true,
      placeholder: "Introduce la contraseña",
      confirmPlaceholder: "Confirma la contraseña",
      enableValidation: true,
    },
    sortable: false,
    filterable: false,
    required: true,
    editable: true,
    visible: false,
  },

  {
    label: "cedula",
    field: "cedula",
    type: "text",
    sortable: false,
    filterable: true,
    editable: true,
  },
  {
    label: "Usuario",
    field: "correo",
    type: "text",
    sortable: true,
    filterable: false,
    required: true,
    editable: true,
  },
  {
    label: "Rol",
    field: "rol",
    type: "select",
    sortable: true,
    filterable: true,
    required: true,
    options: [
      { label: "Admin", value: "admin" },
      { label: "Super Admin", value: "superadmin" },
      { label: "Cliente", value: "cliente" },
    ],
    editable: true,
  },
]);
</script>

<template>
  <BaseMenu :background-image="backgroundImage" :blur-amount="'5px'">
    <DataTable
      title="Gestión de Usuarios"
      :columns="columns"
      endpoint="/api/usuarios"
      search-placeholder="Buscar Usuarios..."
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
