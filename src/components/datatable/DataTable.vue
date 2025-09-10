<!-- DataTable.vue -->
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import { get, post, put, del } from "../../api";
import DataTableForm from "./DataTableForm.vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Gestión de Datos",
  },
  searchPlaceholder: {
    type: String,
    default: "Buscar...",
  },
  editable: {
    type: Boolean,
    default: true,
  },
  deletable: {
    type: Boolean,
    default: true,
  },
  creatable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["on-create", "on-update", "on-delete", "on-error"]);

const authStore = useAuthStore();
const isLoading = ref(false);
const isFormModalOpen = ref(false);
const currentItem = ref(null);
const isEditMode = ref(false);
const searchTerm = ref("");
const currentPage = ref(1);
const perPage = ref(10);
const totalRecords = ref(0);
const serverParams = ref({
  page: 1,
  perPage: 10,
  search: "",
});

// Datos de la tabla
const rows = ref([]);

// Obtener datos del servidor
const fetchData = async () => {
  isLoading.value = true;
  try {
    const params = new URLSearchParams({
      page: serverParams.value.page,
      limit: serverParams.value.perPage,
      search: serverParams.value.search,
    }).toString();

    const response = await get(`${props.endpoint}?${params}`, authStore.token);

    let data = [];
    let total = 0;

    if (response.data && Array.isArray(response.data)) {
      data = response.data;
      total = response.total || response.data.length;
    } else if (Array.isArray(response)) {
      data = response;
      total = response.length;
    } else if (response && response.data && response.total !== undefined) {
      // Manejar respuesta paginada del backend
      data = response.data;
      total = response.total;
    } else {
      data = [];
      total = 0;
    }

    rows.value = data;
    totalRecords.value = total;

    // Asegurar que currentPage no exceda el máximo
    const maxPage = Math.ceil(totalRecords.value / perPage.value);
    if (currentPage.value > maxPage && maxPage > 0) {
      currentPage.value = maxPage;
      serverParams.value.page = maxPage;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    emit("on-error", { type: "fetch", error });
  } finally {
    isLoading.value = false;
  }
};

// Transformar datos para la tabla
const transformedRows = computed(() => {
  return rows.value.map((item) => {
    const transformed = { ...item };

    props.columns.forEach((column) => {
      // Si hay un campo de relación, mostrar el nombre en lugar del ID
      if (column.relationField && item[column.relationField]) {
        const relationColumn = props.columns.find(
          (col) =>
            col.formField === column.relationField ||
            col.field === column.relationField
        );
        if (relationColumn && relationColumn.options) {
          const option = relationColumn.options.find(
            (opt) => opt.value === item[column.relationField]
          );
          if (option) {
            transformed[column.field] = option.label;
          }
        }
      }
    });

    return transformed;
  });
});

// Manejar cambios de paginación y búsqueda
const onPageChange = (params) => {
  serverParams.value = { ...serverParams.value, ...params };
  currentPage.value = serverParams.value.page; // Mantener sincronizado
  fetchData();
};

const onSearch = () => {
  serverParams.value.search = searchTerm.value;
  serverParams.value.page = 1;
  fetchData();
};

// Abrir modal para crear nuevo elemento
const openCreateModal = () => {
  currentItem.value = null;
  isEditMode.value = false;
  isFormModalOpen.value = true;
};

// Abrir modal para editar elemento
const openEditModal = (item) => {
  currentItem.value = { ...item };
  isEditMode.value = true;
  isFormModalOpen.value = true;
};

// Manejar envío del formulario
const handleSubmit = async (formData) => {
  try {
    if (isEditMode.value) {
      await put(`${props.endpoint}/${formData.id}`, formData, authStore.token);
      emit("on-update", formData);
    } else {
      const response = await post(props.endpoint, formData, authStore.token);
      emit("on-create", response);
    }

    isFormModalOpen.value = false;
    fetchData();
  } catch (error) {
    console.error("Error saving data:", error);
    emit("on-error", {
      type: isEditMode.value ? "update" : "create",
      error,
    });
  }
};

// Eliminar elemento
const handleDelete = async (item) => {
  if (!confirm(`¿Estás seguro de que deseas eliminar este registro?`)) {
    return;
  }

  try {
    await del(`${props.endpoint}/${item.id}`, authStore.token);
    emit("on-delete", item);
    fetchData();
  } catch (error) {
    console.error("Error deleting data:", error);
    emit("on-error", { type: "delete", error });
  }
};

// Cargar datos iniciales
onMounted(() => {
  fetchData();
});

watch(serverParams, fetchData, { deep: true });
</script>

<!-- DataTable.vue -->
<template>
  <div class="data-table-container">
    <div class="header-with-back">
      <router-link
        to="/menu"
        class="back-button"
        title="Volver al menú principal"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </router-link>
      <h2>{{ title }}</h2>
    </div>

    <div class="data-table-header">
      <div class="header-actions">
        <div class="search-container">
          <input
            v-model="searchTerm"
            type="text"
            :placeholder="searchPlaceholder"
            @keyup.enter="onSearch"
            class="search-input"
          />
          <button @click="onSearch" class="search-button">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <button v-if="creatable" @click="openCreateModal" class="add-button">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Agregar Nuevo
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.field"
              :class="'column-' + column.field"
            >
              {{ column.label }}
            </th>
            <th v-if="editable || deletable">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td
              :colspan="columns.length + (editable || deletable ? 1 : 0)"
              class="loading-row"
            >
              Cargando datos...
            </td>
          </tr>
          <tr v-else-if="transformedRows.length === 0">
            <td
              :colspan="columns.length + (editable || deletable ? 1 : 0)"
              class="empty-row"
            >
              No se encontraron registros
            </td>
          </tr>
          <tr v-else v-for="row in transformedRows" :key="row.id">
            <td
              v-for="column in columns"
              :key="column.field"
              :class="'column-' + column.field"
            >
              <template v-if="column.field === 'image' && row[column.field]">
                <div class="image-preview">
                  <img :src="row[column.field]" :alt="row.name" />
                </div>
              </template>
              <template v-else>
                {{ row[column.field] }}
              </template>
            </td>
            <td v-if="editable || deletable" class="actions-cell">
              <button
                v-if="editable"
                @click="openEditModal(row)"
                class="action-button edit-button"
                title="Editar"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  ></path>
                  <path
                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  ></path>
                </svg>
              </button>
              <button
                v-if="deletable"
                @click="handleDelete(row)"
                class="action-button delete-button"
                title="Eliminar"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container" v-if="totalRecords > 0">
      <button
        :disabled="currentPage === 1"
        @click="onPageChange({ page: currentPage - 1 })"
        class="pagination-button"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Anterior
      </button>

      <span class="pagination-info">
        Página {{ currentPage }} de {{ Math.ceil(totalRecords / perPage) }}
      </span>

      <button
        :disabled="currentPage >= Math.ceil(totalRecords / perPage)"
        @click="onPageChange({ page: currentPage + 1 })"
        class="pagination-button"
      >
        Siguiente
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <select
        v-model="perPage"
        @change="
          onPageChange({ perPage: parseInt($event.target.value), page: 1 })
        "
        class="per-page-select"
      >
        <option value="5">5 por página</option>
        <option value="10">10 por página</option>
        <option value="25">25 por página</option>
        <option value="50">50 por página</option>
      </select>
    </div>

    <!-- Modal de formulario -->
    <DataTableForm
      v-if="isFormModalOpen"
      :is-open="isFormModalOpen"
      :columns="columns"
      :item="currentItem"
      :is-edit-mode="isEditMode"
      @close="isFormModalOpen = false"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
/* ====== CONTENEDOR GENERAL ====== */
.data-table-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  font-family: "Inter", system-ui, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ====== CABECERA CON BOTÓN DE VOLVER ====== */
.header-with-back {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.back-button {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button:hover {
  background: #f1f5ff;
  border-color: #93c5fd;
  color: #2563eb;
}

/* ====== TÍTULO ====== */
h2 {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

/* ====== CABECERA (BUSCAR + BOTÓN) ====== */
.data-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
}

.search-container {
  display: flex;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 200px;
}

.search-container:focus-within {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.search-input {
  border: none;
  padding: 0.5rem 0.75rem;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 0.8rem;
  color: #334155;
  min-width: 0;
}

.search-button {
  background: transparent;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.search-button:hover {
  color: #2563eb;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.add-button:hover {
  background: #1e40af;
  transform: translateY(-1px);
}

/* ====== TABLA ====== */
.table-wrapper {
  overflow: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
  table-layout: auto; /* Cambiado a auto para mejor ajuste */
}

/* ====== CABECERA DE TABLA ====== */
.data-table th {
  background: #f9fafb;
  padding: 0.75rem 0.6rem;
  text-align: left;
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
  font-size: 0.8rem;
  white-space: nowrap;
}

/* ====== CELDAS ====== */
.data-table td {
  padding: 0.6rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  vertical-align: top; /* Cambiado a top para mejor alineación */
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ====== ANCHOS DE COLUMNAS ESPECÍFICAS PARA PLATOS ====== */
.data-table .column-id {
  width: 40px;
  text-align: center;
  white-space: nowrap;
}

.data-table .column-name {
  width: 120px;
  min-width: 100px;
  max-width: 150px;
}

.data-table .column-description {
  width: 220px;
  min-width: 180px;
  max-width: 280px;
  white-space: normal !important;
  line-height: 1.4;
  word-break: break-word; /* Permite que las palabras largas se dividan */
}

.data-table .column-price {
  width: 70px;
  min-width: 70px;
  text-align: right;
  font-weight: 600;
  color: #059669;
  white-space: nowrap;
}

.data-table .column-category {
  width: 100px;
  min-width: 80px;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-table .column-image {
  width: 80px;
  min-width: 80px;
  text-align: center;
  white-space: nowrap;
}

.data-table th:last-child,
.data-table td:last-child {
  width: 80px;
  min-width: 80px;
  text-align: center;
  white-space: nowrap;
}

/* ====== PREVISUALIZACIÓN DE IMAGEN ====== */
.image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-preview img {
  max-width: 40px;
  max-height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

/* ====== FILAS ====== */
.data-table tbody tr:nth-child(even) {
  background: #fafafa;
}

.data-table tbody tr:hover {
  background: #f1f5ff;
  transition: background 0.2s ease;
}

.loading-row,
.empty-row {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  font-style: italic;
  font-size: 0.8rem;
}

/* ====== BOTONES DE ACCIÓN ====== */
.actions-cell {
  display: flex;
  gap: 0.35rem;
  justify-content: center;
  align-items: center;
}

.action-button {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-button svg {
  width: 12px;
  height: 12px;
}

.edit-button:hover {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #2563eb;
}

.delete-button:hover {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}

/* ====== PAGINACIÓN ====== */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  gap: 0.75rem;
  flex-wrap: wrap;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.pagination-button {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  white-space: nowrap;
}

.pagination-button:hover:not(:disabled) {
  background: #f1f5ff;
  border-color: #93c5fd;
  color: #2563eb;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #64748b;
  font-size: 0.75rem;
}

.per-page-select {
  padding: 0.35rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.75rem;
  background: white;
  cursor: pointer;
  min-width: 100px;
}

.per-page-select:hover {
  border-color: #2563eb;
}

/* ====== RESPONSIVE ====== */
@media (max-width: 1200px) {
  .data-table .column-description {
    width: 180px;
    min-width: 150px;
    max-width: 200px;
  }

  .data-table .column-name {
    width: 110px;
    min-width: 90px;
    max-width: 130px;
  }
}

@media (max-width: 1024px) {
  .data-table .column-description {
    width: 160px;
    min-width: 130px;
    max-width: 180px;
  }

  .data-table .column-category {
    display: none;
  }
}

@media (max-width: 900px) {
  .data-table .column-image {
    display: none;
  }
}

@media (max-width: 768px) {
  h2 {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }

  .data-table-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    flex-direction: column;
  }

  .search-container {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .data-table th,
  .data-table td {
    font-size: 0.7rem;
    padding: 0.5rem;
  }

  .data-table .column-description {
    display: none;
  }

  .add-button {
    width: 100%;
    justify-content: center;
  }

  .actions-cell {
    gap: 0.25rem;
  }

  .action-button {
    padding: 0.25rem;
  }

  .action-button svg {
    width: 10px;
    height: 10px;
  }

  .pagination-container {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .pagination-button,
  .per-page-select {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .data-table .column-price {
    width: 60px;
    min-width: 60px;
  }

  .data-table th:last-child,
  .data-table td:last-child {
    width: 70px;
    min-width: 70px;
  }
}

/* Estilos para mejorar la visualización en pantallas grandes */
@media (min-width: 1400px) {
  .data-table .column-name {
    width: 150px;
    max-width: 180px;
  }

  .data-table .column-description {
    width: 280px;
    max-width: 320px;
  }

  .data-table .column-category {
    width: 120px;
    max-width: 150px;
  }
}
</style>
