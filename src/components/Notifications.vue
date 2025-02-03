<template>
  <div class="fixed top-4 right-4 space-y-2 z-50">
    <transition-group name="slide-up" tag="div">
      <div
        v-for="(notify) in notificationStore.notifications"
        :key="notify.id"
        :class="[
          'p-3 rounded shadow-md mb-2 flex items-center gap-2 animate-bounce',
          backgroundClass(notify.type)
        ]"
      >
        <span class="font-medium flex-1">{{ notify.message }}</span>
        <button @click="close(notify.id)" class="font-bold ml-auto animate-ping">
          x
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '../stores/useNotificationStore'
import { debounce } from 'lodash-es'

const notificationStore = useNotificationStore()

const close = debounce((id: number): void => {
  notificationStore.removeNotification(id)
}, 300)

function backgroundClass(type: string): string {
  switch (type) {
    case 'success':
      return 'bg-green-500 text-white'
    case 'error':
      return 'bg-red-500 text-white'
    case 'info':
      return 'bg-blue-500 text-white'
    case 'warning':
      return 'bg-yellow-400 text-black'
    default:
      return 'bg-gray-800 text-white'
  }
}
</script>

<style scoped>
</style>
