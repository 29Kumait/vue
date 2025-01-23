<script setup lang="ts">
import DrawerUp from './components/DrawerUp.vue'
import Footer from './components/Footer.vue'
import Notifications from './components/Notifications.vue'
import { onMounted } from 'vue'
import { useUserStore } from './stores/useUserStore'

const userStore = useUserStore()

onMounted(() => {
  userStore.initAuthPersistence()
})
</script>

<template>
  <div>
    <Notifications />
    <DrawerUp />
    <router-view />
    <Footer />
  </div>
</template>