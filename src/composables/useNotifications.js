// composables/useNotifications.js
import { ref, readonly } from "vue";

// El estado se declara fuera de la función para que sea un singleton.
const notifications = ref([]);

export const useNotifications = () => {
  const addNotification = (message, type = "success", duration = 3000) => {
    const id = Date.now();
    const notification = {
      id,
      message,
      type,
      duration,
    };

    notifications.value.push(notification);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(
      (notif) => notif.id !== id
    );
  };

  const clearAll = () => {
    notifications.value = [];
  };

  return {
    notifications: readonly(notifications), // Exponer como solo lectura para evitar mutaciones externas
    addNotification,
    removeNotification,
    clearAll,
  };
};
