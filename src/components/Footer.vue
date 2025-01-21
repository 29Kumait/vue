<template>
  <div class="relative bg-gray-50">
    <section>
      <div class="relative">
        <div class="absolute top-0 left-0 right-0 h-px bg-gray-400"></div>
        <div class="bg-gray-900 text-white">
          <div class="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="col-span-1 relative">
                <h3 class="text-2xl font-bold mb-4">Approachable</h3>
                <p class="text-gray-400">Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class documentation.</p>
                <div class="absolute top-0 right-0 h-full border-l border-gray-700 w-1"></div>
              </div>
              <div class="col-span-1 relative">
                <h3 class="text-2xl font-bold mb-4">Performant</h3>
                <p class="text-gray-400">Truly reactive, compiler-optimized rendering system that rarely requires manual optimization.</p>
                <div class="absolute top-0 right-0 h-full border-l border-gray-700 w-1"></div>
              </div>
              <div class="col-span-1">
                <h3 class="text-2xl font-bold mb-4">Products</h3>
                <ul class="space-y-2">
                  <li><router-link to="/" class="text-blue-500 hover:text-blue-400">Home</router-link></li>
                  <li><router-link to="/second" class="text-blue-500 hover:text-blue-400">Page 2nd</router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>