<template>
  <section class="order-summary">
    <h3>
      <span class="section-icon">📋</span>
      Resumen del Pedido
    </h3>
    <div class="order-items-container">
      <div v-for="(item, i) in items" :key="i" class="order-item-card">
        <div class="item-details">
          <span class="item-name">{{ item.title }}</span>
          <div class="item-meta">
            <span class="item-quantity">Cantidad: {{ item.quantity }}</span>
            <span class="item-price">{{
              formatPrice(item.price * item.quantity)
            }}</span>
          </div>
        </div>
        <button class="remove-item-btn" @click="$emit('remove-item', item)">
          ×
        </button>
      </div>
    </div>
    <div class="order-total">
      <span>Total a pagar</span>
      <span class="total-price">{{ formatPrice(total) }}</span>
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

defineEmits(["remove-item"]);

const formatPrice = inject("formatPrice", (price) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price)
);
</script>
<style scoped>
.order-summary {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.order-summary h3 {
  color: #1f2937;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e7eb;
}

.section-icon {
  font-size: 1.2rem;
}

.order-items-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;
}

.order-items-container.empty {
  min-height: 120px;
  justify-content: center;
  align-items: center;
}

.empty-cart-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  padding: 20px;
  text-align: center;
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: 10px;
  opacity: 0.5;
}

.empty-cart-message p {
  margin: 0;
  font-size: 0.9rem;
}

.order-item-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
  position: relative;
}

.order-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #e5e7eb;
  background: white;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #1f2937;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.item-quantity {
  font-size: 0.85rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 12px;
}

.item-price {
  font-weight: 700;
  color: #059669;
  font-size: 0.95rem;
}

.remove-item-btn {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.2s;
  flex-shrink: 0;
}

.remove-item-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

.remove-item-btn:active {
  transform: scale(0.95);
}

.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding: 20px 0;
  margin-top: 15px;
  border-top: 2px solid #e5e7eb;
  font-size: 1.3rem;
  color: #1f2937;
}

.total-price {
  color: #059669;
  font-weight: 800;
}

/* Scroll personalizado */
.order-items-container::-webkit-scrollbar {
  width: 6px;
}

.order-items-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.order-items-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.order-items-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animaciones */
.order-item-card {
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .order-summary {
    padding: 20px;
    margin-bottom: 20px;
  }

  .order-summary h3 {
    font-size: 1.1rem;
  }

  .order-item-card {
    padding: 14px;
    gap: 12px;
  }

  .item-name {
    font-size: 0.95rem;
  }

  .item-price {
    font-size: 0.9rem;
  }

  .order-total {
    font-size: 1.2rem;
    padding: 16px 0;
  }
}

@media (max-width: 480px) {
  .order-summary {
    padding: 16px;
  }

  .order-item-card {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 10px;
  }

  .item-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
  }

  .remove-item-btn {
    align-self: flex-end;
    margin-top: -40px;
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .order-total {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    font-size: 1.1rem;
  }

  .total-price {
    font-size: 1.3rem;
  }
}

/* Estados de focus para accesibilidad */
.remove-item-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
}

/* Efecto cuando se remueve un item */
.order-item-card.removing {
  animation: slideOut 0.3s ease-in forwards;
}

@keyframes slideOut {
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
