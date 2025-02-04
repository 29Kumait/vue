<template>
  <div class="futuristic-page bg-gray-50 min-h-screen py-16 px-16">
    <div class="spacious-container mx-auto max-w-5xl">
      <h1 class="text-4xl font-bold mb-8">Futuristic Page</h1>
      <p class="text-gray-700 mb-8">Welcome to the futuristic page with advanced design elements.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          title="Card Title 1"
          description="This is a description for card 1."
          image="https://via.placeholder.com/150"
        />
        <Card
          title="Card Title 2"
          description="This is a description for card 2."
          image="https://via.placeholder.com/150"
        />
        <Card
          title="Card Title 3"
          description="This is a description for card 3."
          image="https://via.placeholder.com/150"
        />
      </div>

      <div class="mt-16">
        <Box content="This is a box content." background="bg-blue-100" />
      </div>

      <div class="mt-16">
        <Frame content="This is a frame content." border="border-red-500" />
      </div>

      <div class="mt-16">
        <Shape type="circle" color="bg-green-100" />
        <Shape type="square" color="bg-yellow-100" />
        <Shape type="rectangle" color="bg-purple-100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '../components/Card.vue';
import Box from '../components/Box.vue';
import Frame from '../components/Frame.vue';
import Shape from '../components/Shape.vue';
</script>

<style scoped>
.futuristic-page {
  @apply bg-white;
}
</style>
