<script setup lang="ts">
import Drawer from './Drawer.vue'
import { onMounted, computed } from 'vue'
import { useUserStore } from '../stores/useUserStore'
import Account from './Account.vue'
import Auth from './Auth.vue'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUserSession()
})

const isAuthenticated = computed(() => userStore.isAuthenticated)
</script>

<template>
  <Drawer>
    <template #sidebar-header>
      <h1 class="text-xl font-bold">Title</h1>
    </template>
    <template #sidebar-content>
      <div class="container" style="padding: 50px 0 100px 0">      
        <Account v-if="isAuthenticated" />
        <Auth v-else />
      </div>
    </template>
  </Drawer>
</template>
