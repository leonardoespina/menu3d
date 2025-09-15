import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
  state: () => ({
    isLoading: false,
    notification: {
      show: false,
      message: "",
      type: "success", // success, error, warning, info
    },
  }),
  actions: {
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
    showNotification(payload) {
      this.notification.message = payload.message;
      this.notification.type = payload.type || "success";
      this.notification.show = true;
      setTimeout(() => {
        this.hideNotification();
      }, 5000); // Ocultar después de 5 segundos
    },
    hideNotification() {
      this.notification.show = false;
      this.notification.message = "";
    },
  },
});
