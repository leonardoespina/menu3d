<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import DataTable from "../../components/datatable/DataTable.vue";
import BaseMenu from "../../components/basemenu/BaseMenu.vue";
import backgroundImage from "../../assets/3.jpg";
import { useCategories } from "../../composables/useCategories";
import { useNotifications } from "../../composables/useNotifications"; // 1. Importar el composable

const authStore = useAuthStore();
const { categories, loading, error, loadCategories } = useCategories();
const { addNotification } = useNotifications(); // 2. Destructurar la función addNotification

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
    field: "categoriaNombre",
    type: "select",
    sortable: true,
    filterable: true,
    required: true,
    options: [],
    formField: "categoriaId",
    relationField: "categoriaId",
    editable: true,
  },
  {
    label: "Modelo 3D",
    field: "imagen",
    type: "file",
    accept: ".glb",
    uploadLabel: "Seleccionar modelo 3D (GLB)",
    sortable: false,
    filterable: false,
    editable: true,
  },
]);

// Mapa de categorías para búsqueda rápida
const categoriesMap = ref({});

watch(categories, (newCategories) => {
  if (newCategories) {
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

const handleCreate = (newItem) => {
  console.log("Plato creado:", newItem);
  // Si el backend devuelve { plato: {...} }, usar newItem.plato
  const createdPlato = newItem.plato || newItem;
  addNotification("¡Plato creado exitosamente!", "success");
};

const handleUpdate = (updatedItem) => {
  console.log("Plato actualizado:", updatedItem);
  addNotification("¡Plato actualizado exitosamente!", "success");
};

const handleDelete = (deletedItem) => {
  console.log("Plato eliminado:", deletedItem);
  addNotification("¡Plato eliminado exitosamente!", "success");
};

const handleError = (errorInfo) => {
  console.error("Error en operación:", errorInfo);
  const errorMessage =
    errorInfo.error?.message || errorInfo.error || "Error desconocido";
  addNotification(`Error en ${errorInfo.type}: ${errorMessage}`, "error");
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
