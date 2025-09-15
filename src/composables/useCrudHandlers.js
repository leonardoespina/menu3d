import { useNotifications } from "./useNotifications";

export function useCrudHandlers(entityName = "Elemento") {
  const { addNotification } = useNotifications();

  const handleCreate = (newItem) => {
    console.log(`${entityName} creado:`, newItem);
    addNotification(`¡${entityName} creado exitosamente!`, "success");
  };

  const handleUpdate = (updatedItem) => {
    console.log(`${entityName} actualizado:`, updatedItem);
    addNotification(`¡${entityName} actualizado exitosamente!`, "success");
  };

  const handleDelete = (deletedItem) => {
    console.log(`${entityName} eliminado:`, deletedItem);
    addNotification(`¡${entityName} eliminado exitosamente!`, "success");
  };

  const handleError = (errorInfo) => {
    console.error("Error en operación:", errorInfo);
    const errorMessage =
      errorInfo.error?.message || errorInfo.error || "Error desconocido";
    addNotification(`Error en ${errorInfo.type}: ${errorMessage}`, "error");
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleError,
  };
}
