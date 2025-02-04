<template>
  <div :class="boxClasses" :style="{ backgroundColor: background }">
    <p>{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
});

const boxClasses = computed(() => [
  'p-4',
  'rounded-lg',
  'shadow-md',
  'transition-transform',
  'duration-300',
  'ease-in-out',
  'transform',
  'hover:scale-105',
  'responsive-box',
]);
</script>

<style scoped>
.responsive-box {
  @apply w-full md:w-1/2 lg:w-1/3;
}
</style>
