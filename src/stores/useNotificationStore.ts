import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Notification {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])

  let nextId = 1

  function addNotification(
    type: Notification['type'],
    message: string,
    duration = 3000
  ): void {
    const id = nextId++
    notifications.value.push({ id, type, message, duration })

    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration)
    }
  }

  function removeNotification(id: number): void {
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== id
    )
  }

  function clearNotifications(): void {
    notifications.value = []
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  }
})
