<template>
    <button
      @click="toggleSidebar"
      class="fixed min-h-screen px-3 py-2 text-xl bg-a-cyan text-scale-black transition-all duration-300 ease-snappy hover:bg-green-700 rounded-md shadow-md inset-shadow-sm inset-shadow-white/20 ring ring-blue-600 inset-ring inset-ring-white/15 z-40"
    >
      {{ isSidebarOpen ? "x" : "←" }}
    </button>
    <aside
      class="fixed top-0 right-0 h-screen w-2/4 bg-gray-800 text-white transform transition-transform duration-300 z-20"
      :class="{
        'translate-x-full': !isSidebarOpen,
        'translate-x-0': isSidebarOpen,
      }"
    >
      <div class="p-4 text-xl font-bold border-b border-gray-700">
        <slot name="sidebar-header">
          <!-- slot -->
          Default Sidebar Header
        </slot>
      </div>

      <div class="p-4">
        <slot name="sidebar-content">
          <!-- Default fallback content if parent doesn't provide it -->
          <p class="text-gray-400">No sidebar content provided</p>
        </slot>
      </div>
    </aside>

    <!--  Overlay (when click on the side hidden) -->
    <div
      class="fixed inset-0 bg-transplant text-neon-indigo bg-opacity-30 z-10"
      v-if="isSidebarOpen"
      @click="closeSidebar"
    ></div>

    <!--  Main Content -->
    <div class="flex-grow mr-0 md:mr-64">
      <div class="p-4">
        <div class="mt-4">
          <slot>
            <!-- slot if no  content -->
            <h2 class="text-2xl text-gray-800 font-bold">Main Content</h2>
          </slot>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSidebarOpen = ref(false);

function toggleSidebar(): void {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function closeSidebar(): void {
  isSidebarOpen.value = false;
}
</script>

<style scoped></style>
