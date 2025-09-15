// stores/payment.js
import { defineStore } from "pinia";
import api from "../api";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    bancos: [],
    // loading y error ya no son necesarios aquí, se manejan globalmente.
  }),

  actions: {
    async fetchBancos() {
      try {
        // La carga y el manejo de errores son automáticos por los interceptores.
        const response = await api.get("/api/bancos");
        this.bancos = response.data;
      } catch (error) {
        // El interceptor ya mostró una notificación.
        // Solo registramos el error si es necesario para depuración.
        console.error("Error loading banks:", error);
        // Opcional: limpiar el estado en caso de error.
        this.bancos = [];
      }
    },
  },
});
