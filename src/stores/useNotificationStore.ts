import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Notification {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export const useNotificationStore = defineStore('notification', () => {
  // State
  const notifications = ref<Notification[]>([]);

  // ID generator
  let nextId = 1;

  // Actions
  function addNotification(type: Notification['type'], message: string, duration = 3000) {
    const id = nextId++;
    notifications.value.push({ id, type, message, duration });
    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration);
    }
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter(notification => notification.id !== id);
  }

  return {
    notifications,
    addNotification,
    removeNotification,
  };
});