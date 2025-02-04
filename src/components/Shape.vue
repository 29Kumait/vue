<template>
  <div :class="shapeClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { type: String, required: true },
  color: { type: String, required: true }
});

const shapeClasses = computed(() => {
  const baseClasses = [
    'transition-transform',
    'duration-500',
    'ease-in-out',
    'transform',
    'hover:scale-105',
    props.color
  ];

  switch (props.type) {
    case 'circle':
      return [...baseClasses, 'rounded-full', 'w-16', 'h-16'];
    case 'square':
      return [...baseClasses, 'w-16', 'h-16'];
    case 'rectangle':
      return [...baseClasses, 'w-32', 'h-16'];
    default:
      return baseClasses;
  }
});
</script>

<style scoped>
.shape-container {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
}
</style>
