<!-- PlatoManagement.vue -->
<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import DataTable from "../../components/datatable/DataTable.vue";
import BaseMenu from "../../components/basemenu/BaseMenu.vue";
import backgroundImage from "../../assets/3.jpg";
import { useCategories } from "../../composables/useCategories";

const authStore = useAuthStore();
const { categories, loading, error, loadCategories } = useCategories();

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
    label: "Descripción",
    field: "descripcion",
    type: "textarea",
    sortable: false,
    filterable: true,
    editable: true,
  },
  {
    label: "Precio",
    field: "precio",
    type: "number",
    sortable: true,
    filterable: false,
    required: true,
    step: 0.01,
    min: 0,
    editable: true,
  },
  {
    label: "Categoría",
    field: "categoriaNombre", // Mostrar nombre en tabla
    type: "select", // Usar select en formulario
    sortable: true,
    filterable: true,
    required: true,
    options: [],
    formField: "categoriaId", // Campo real para el formulario
    relationField: "categoriaId",
    editable: true,
  },

  {
    label: "Imagen",
    field: "imagen",
    type: "text",
    sortable: false,
    filterable: false,
    editable: true,
  },
]);

// Mapa de categorías para búsqueda rápida
const categoriesMap = ref({});

// Observar cambios en las categorías cargadas
watch(categories, (newCategories) => {
  if (newCategories && newCategories.length > 0) {
    // Crear mapa para búsqueda rápida
    categoriesMap.value = newCategories.reduce((map, cat) => {
      map[cat.id] = cat.nombre;
      return map;
    }, {});

    const categoryOptions = newCategories.map((cat) => ({
      value: cat.id,
      label: cat.nombre,
    }));

    // Actualizar opciones de la columna de categoría
    const categoryColumn = columns.value.find(
      (col) => col.field === "categoriaNombre"
    );
    if (categoryColumn) {
      categoryColumn.options = categoryOptions;
    }
  }
});

// Manejadores de eventos
const handleCreate = (newItem) => {
  console.log("Plato creado:", newItem);
};

const handleUpdate = (updatedItem) => {
  console.log("Plato actualizado:", updatedItem);
};

const handleDelete = (deletedItem) => {
  console.log("Plato eliminado:", deletedItem);
};

const handleError = (errorInfo) => {
  console.error("Error en operación:", errorInfo);
};

// Cargar categorías al montar el componente
onMounted(() => {
  loadCategories();
});
</script>

<template>
  <BaseMenu :background-image="backgroundImage" :blur-amount="'5px'">
    <DataTable
      title="Gestión de Platos"
      :columns="columns"
      endpoint="/api/platos"
      search-placeholder="Buscar platos..."
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

<style scoped></style>
