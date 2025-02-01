// src/stores/useNotificationStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Notification {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

export const useNotificationStore = defineStore('notification', () => {
  // State
  const notifications = ref<Notification[]>([])

  // ID generator
  let nextId = 1

  // Actions
  function addNotification(
    type: Notification['type'],
    message: string,
    duration = 3000
  ) {
    const id = nextId++
    notifications.value.push({ id, type, message, duration })

    // Auto-remove notification if duration is set
    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration)
    }
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== id
    )
  }

  // Optionally clear all notifications at once
  function clearNotifications() {
    notifications.value = []
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  }
})