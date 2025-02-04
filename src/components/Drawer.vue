<template>
  <!-- Toggle Button -->
  <button
    @click="toggleSidebar"
    class="fixed top-0 right-0 min-h-screen px-3 py-2 text-xl text-white bg-p3-yellow text-scale-black transition-all duration-300 ease-snappy hover:bg-p3-indigo rounded-md shadow-md inset-shadow-sm inset-shadow-white/20 ring ring-blue-600 inset-ring inset-ring-white/15 z-40"
  >
    {{ isSidebarOpen ? "🅧" : "←" }}
  </button>

  <!-- Sidebar -->
  <aside
    class="fixed top-0 right-10 h-screen w-2/4 bg-p3-gray text-white transform transition-transform duration-300 z-20 flex flex-col border-l-p3-yellow border-1"
    :class="{
      'translate-x-full': !isSidebarOpen,
      'translate-x-0': isSidebarOpen,
    }"
  >
    <!-- Sticky header slot -->
    <div class="mt-10 shrink-0">
      <slot name="sidebar-header" />
    </div>
    <!-- Scrollable content slot -->
    <div class="p-4 flex-grow overflow-y-auto">
      <slot name="sidebar-content" />
    </div>
  </aside>

  <!-- Overlay to close sidebar when clicked -->
  <div
    class="fixed inset-0 z-10 backdrop-blur-2xl grayscale"
    v-if="isSidebarOpen"
    @click="closeSidebar"
  ></div>

  <!-- Main Content Slot -->
  <div class="flex-grow mr-0 md:mr-64">
    <div class="p-4">
      <div class="mt-4">
        <slot><!-- Default slot content if none provided --></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// Local state to control sidebar open/close status.
const isSidebarOpen = ref<boolean>(false)

// Toggle the sidebar open state.
function toggleSidebar(): void {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Close the sidebar.
function closeSidebar(): void {
  isSidebarOpen.value = false
}

// Watch for route changes so that the sidebar automatically closes
const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    isSidebarOpen.value = false
  }
)
</script>
