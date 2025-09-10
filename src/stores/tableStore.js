// stores/tableStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTableStore = defineStore("table", () => {
  const data = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const searchQuery = ref("");
  const sortBy = ref("");
  const sortOrder = ref("asc");

  const setData = (newData) => {
    data.value = newData;
  };

  const setLoading = (loading) => {
    isLoading.value = loading;
  };

  const setError = (newError) => {
    error.value = newError;
  };

  const setPagination = (page, total) => {
    currentPage.value = page;
    totalPages.value = total;
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const setSort = (field, order) => {
    sortBy.value = field;
    sortOrder.value = order;
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    data,
    isLoading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    sortBy,
    sortOrder,
    setData,
    setLoading,
    setError,
    setPagination,
    setSearchQuery,
    setSort,
    clearError,
  };
});
