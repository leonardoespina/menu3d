<!-- components/ui/Notifications.vue -->
<template>
  <div class="notifications-container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="['notification', `notification-${notification.type}`]"
      @click="removeNotification(notification.id)"
    >
      <div class="notification-content">
        <span class="notification-message">{{ notification.message }}</span>
      </div>
      <button class="notification-close" @click="removeNotification(notification.id)">
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
import { useNotifications } from '../../composables/useNotifications';

const { notifications, removeNotification } = useNotifications();
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
}

.notification {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
  border-left: 4px solid;
  animation: slideIn 0.3s ease;
}

.notification-success {
  border-left-color: #10b981;
  background: #ecfdf5;
}

.notification-error {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.notification-warning {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.notification-info {
  border-left-color: #3b82f6;
  background: #eff6ff;
}

.notification-content {
  flex: 1;
}

.notification-message {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #9ca3af;
  margin-left: 10px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  color: #6b7280;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.notification-leave-active {
  animation: slideOut 0.3s ease;
}
</style>