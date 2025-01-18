<template>
    <Drawer>
      <template #sidebar-header>
        <h1 class="text-xl font-bold">Title</h1>
      </template>
  
      <!-- Slot: content -->
      <template #sidebar-content>

        <ul>
          <li class="px-4 py-2 hover:bg-neon-pink cursor-pointer"> A</li>
          <li class="px-4 py-2 hover:bg-neon-lime cursor-pointer"> Item B</li>
          <li class="px-4 py-2 hover:bg-neon-cyan cursor-pointer">Menu Item C</li>
        </ul>
          <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
      </template>

      <!-- Spare Slot -->
      <h2 class="text-2xl font-bold text-gray-800"></h2>
    </Drawer>
  </template>
  
  <script setup lang="ts">
   import Drawer from './Drawer.vue';
import { ref, defineProps,onMounted, watch } from 'vue';
import Account from './Account.vue'
import Auth from './Auth.vue'
import { supabase } from '../supabase'
const session = ref<any>()

onMounted(() => {
  supabase.auth.getSession().then(({ data }: { data: any }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_: any, _session: any) => {
    session.value = _session
  })
})
  </script>

<style scoped>
</style>
