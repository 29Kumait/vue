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
      </template>

      <!-- Spare Slot -->
      <h2 class="text-2xl font-bold text-gray-800"></h2>
    </Drawer>
  </template>
  
  <script setup lang="ts">
   import Drawer from './Drawer.vue';
  </script>

<style scoped>
</style>
