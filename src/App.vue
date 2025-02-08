<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import Footer from './components/Footer.vue';
import Notifications from './components/Notifications.vue';
import { useUserStore } from './stores/useUserStore';

const DrawerUp = defineAsyncComponent(() => import('./components/DrawerUp.vue'));
const isClient = ref<boolean>(false);

const userStore = useUserStore();

onMounted(() => {
  userStore.initAuthPersistence();
  isClient.value = true;
});
</script>

<template>
    <div v-if="isClient">
    <Notifications />
    <DrawerUp />
    <router-view />
    <Footer />
  </div>
</template>