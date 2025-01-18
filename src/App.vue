<script setup lang="ts">
import DrawerUp from './components/DrawerUp.vue'
import First from './views/First.vue'
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
    <First />
    <Footer />
    <router-view />
  </div>
</template>