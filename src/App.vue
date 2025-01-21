<script setup lang="ts">
import DrawerUp from './components/DrawerUp.vue'
import Footer from './components/Footer.vue'

import { onMounted } from 'vue'
import { useUserStore } from './stores/useUserStore'

const userStore = useUserStore()

onMounted(() => {
  userStore.initAuthPersistence()
})
</script>

<template>
  <div>
    <DrawerUp />
    <router-view />
    <Footer />
  </div>
</template>