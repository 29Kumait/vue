<template>
  <div :class="frameClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  content: { type: String, required: true },
  border: { type: String, required: true }
});

const frameClasses = computed(() => {
  return [
    'p-4',
    'rounded-lg',
    'shadow-md',
    'transition-transform',
    'duration-500',
    'ease-in-out',
    'transform',
    'hover:scale-105',
    props.border
  ];
});
</script>

<style scoped>
.frame-container {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
}
</style>
