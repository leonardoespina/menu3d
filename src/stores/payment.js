// stores/payment.js
import { defineStore } from "pinia";
import { get } from "../api";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    bancos: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchBancos() {
      this.loading = true;
      this.error = null;
      try {
        // Usar la función get del archivo api.js
        this.bancos = await get("/api/bancos");
      } catch (error) {
        this.error = error.message;
        console.error("Error loading banks:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
