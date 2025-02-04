<template>
  <div class="futuristic-page">
    <header class="text-center py-8">
      <h1 class="text-4xl font-bold">Futuristic Page</h1>
      <p class="text-lg text-gray-600">A creative and advanced design</p>
    </header>

    <section class="p-8">
      <h2 class="text-2xl font-semibold mb-4">Reusable Components</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          title="Card Title 1"
          description="This is a description for Card 1."
          image="https://via.placeholder.com/150"
        />
        <Card
          title="Card Title 2"
          description="This is a description for Card 2."
          image="https://via.placeholder.com/150"
        />
        <Box content="This is a Box component." background="bg-blue-500" />
        <Frame content="This is a Frame component." border="border-red-500" />
        <Shape type="Circle" color="bg-green-500" />
        <Shape type="Square" color="bg-yellow-500" />
      </div>
    </section>

    <section class="p-8">
      <h2 class="text-2xl font-semibold mb-4">Product Gallery</h2>
      <ProductGallery />
    </section>
  </div>
</template>

<script setup lang="ts">
import Card from '../components/Card.vue';
import Box from '../components/Box.vue';
import Frame from '../components/Frame.vue';
import Shape from '../components/Shape.vue';
import ProductGallery from '../components/ProductGallery.vue';
</script>

<style scoped>
.futuristic-page {
  @apply bg-p3-gray min-h-screen;
}
</style>
