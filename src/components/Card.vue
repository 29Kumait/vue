<template>
  <div class="card-container transition-transform duration-500 ease-in-out transform hover:scale-105">
    <img :src="image" alt="Card Image" class="w-full h-48 object-cover rounded-t-lg" />
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-gray-700">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});
</script>

<style scoped>
.card-container {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
}
</style>
