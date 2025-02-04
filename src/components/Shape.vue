<template>
  <div
    :class="[
      'shape-container transition-transform duration-300 ease-in-out transform hover:scale-105',
      shapeClass
    ]"
    :style="{ backgroundColor: color }"
  ></div>
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

const shapeClass = computed(() => {
  switch (props.type) {
    case 'circle':
      return 'rounded-full w-16 h-16';
    case 'square':
      return 'w-16 h-16';
    case 'rectangle':
      return 'w-32 h-16';
    default:
      return '';
  }
});
</script>

<style scoped>
.shape-container {
  @apply bg-white shadow-md overflow-hidden;
}
</style>
