<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import Footer from './components/Footer.vue';
import Notifications from './components/Notifications.vue';
import { useUserStore } from './stores/useUserStore';

const DrawerUp = defineAsyncComponent(() => import('./components/DrawerUp.vue'));

const userStore = useUserStore();

onMounted(() => {
  userStore.initAuthPersistence();
});
</script>

<template>
  <div>
    <Notifications />
    <DrawerUp />
    <router-view />
    <Footer />
  </div>
</template>
