<template>
    <button
      @click="toggleSidebar"
      class="fixed top-0 right-0 min-h-screen px-3 py-2 text-xl text-white bg-p3-yellow text-scale-black transition-all duration-300 ease-snappy hover:bg-p3-indigo rounded-md shadow-md inset-shadow-sm inset-shadow-white/20 ring ring-blue-600 inset-ring inset-ring-white/15 z-40"
    >
      {{ isSidebarOpen ? "🅧" : "←" }}
    </button>
    <aside
  class="fixed top-0 right-0 h-screen w-2/4 bg-p3-gray text-white border-l-2 border-p3-indigo shadow-lg
         transform transition-transform duration-300 z-20 flex flex-col"
  :class="{
    'translate-x-full': !isSidebarOpen,
    'translate-x-0': isSidebarOpen,
  }"
>
  <!-- "Sticky" header  -->
  <div class="mt-10 shrink-0">
    <slot name="sidebar-header" />
  </div>

  <!-- Scrollable content -->
  <div class="p-4 flex-grow overflow-y-auto">
    <slot name="sidebar-content" />
  </div>
  <div class="absolute top-0 left-1/2 -z-10 pointer-events-none -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
      <div class="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
</aside>


    <!--  Overlay (when click on the side hidden) -->
    <div
      class="fixed inset-0 z-10"
      v-if="isSidebarOpen"
      @click="closeSidebar"
    ></div>

    <!--  Main Content -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isSidebarOpen = ref(false)

function toggleSidebar(): void {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar(): void {
  isSidebarOpen.value = false
}

// Watch the route, close sidebar on change:
const route = useRoute()
watch(
  () => route.fullPath, 
  () => {
    // whenever the route changes, close the sidebar
    isSidebarOpen.value = false
  }
)
</script>

<style scoped></style>
