<template>
  <div :class="shapeClasses" :style="{ backgroundColor: color }">
    <p>{{ type }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const shapeClasses = computed(() => [
  'p-4',
  'rounded-lg',
  'shadow-md',
  'transition-transform',
  'duration-300',
  'ease-in-out',
  'transform',
  'hover:scale-105',
  'responsive-shape',
]);
</script>

<style scoped>
.responsive-shape {
  @apply w-full md:w-1/2 lg:w-1/3;
}
</style>
