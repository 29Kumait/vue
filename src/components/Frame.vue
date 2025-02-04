<template>
  <div
    :class="[
      'frame-container transition-transform duration-300 ease-in-out transform hover:scale-105',
      border
    ]"
  >
    <div class="p-4">
      <p class="text-gray-600">{{ content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  border: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.frame-container {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
}
</style>
