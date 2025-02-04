<template>
  <div :class="frameClasses" :style="{ borderColor: border }">
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
  border: {
    type: String,
    required: true,
  },
});

const frameClasses = computed(() => [
  'p-4',
  'rounded-lg',
  'shadow-md',
  'transition-transform',
  'duration-300',
  'ease-in-out',
  'transform',
  'hover:scale-105',
  'responsive-frame',
]);
</script>

<style scoped>
.responsive-frame {
  @apply w-full md:w-1/2 lg:w-1/3;
}
</style>
