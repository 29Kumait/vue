<template>
  <div :class="boxClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  content: { type: String, required: true },
  background: { type: String, required: true }
});

const boxClasses = computed(() => {
  return [
    'p-4',
    'rounded-lg',
    'shadow-md',
    'transition-transform',
    'duration-500',
    'ease-in-out',
    'transform',
    'hover:scale-105',
    props.background
  ];
});
</script>

<style scoped>
.box-container {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
}
</style>
