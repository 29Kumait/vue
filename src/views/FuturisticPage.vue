<template>
  <div class="futuristic-page">
    <header class="header bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
      <h1 class="text-4xl font-bold">Futuristic Page</h1>
      <p class="text-lg">A creative and advanced design</p>
    </header>

    <section class="cards-section p-8">
      <h2 class="text-2xl font-semibold mb-4">Cards</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card
          v-for="card in cards"
          :key="card.id"
          :title="card.title"
          :description="card.description"
          :image="card.image"
          class="hover:shadow-lg transition-shadow duration-300"
        />
      </div>
    </section>

    <section class="boxes-section p-8">
      <h2 class="text-2xl font-semibold mb-4">Boxes</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Box
          v-for="box in boxes"
          :key="box.id"
          :content="box.content"
          :background="box.background"
          class="hover:shadow-lg transition-shadow duration-300"
        />
      </div>
    </section>

    <section class="frames-section p-8">
      <h2 class="text-2xl font-semibold mb-4">Frames</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Frame
          v-for="frame in frames"
          :key="frame.id"
          :content="frame.content"
          :border="frame.border"
          class="hover:shadow-lg transition-shadow duration-300"
        />
      </div>
    </section>

    <section class="shapes-section p-8">
      <h2 class="text-2xl font-semibold mb-4">Shapes</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Shape
          v-for="shape in shapes"
          :key="shape.id"
          :type="shape.type"
          :color="shape.color"
          class="hover:shadow-lg transition-shadow duration-300"
        />
      </div>
    </section>

    <section class="product-gallery-section p-8">
      <h2 class="text-2xl font-semibold mb-4">Product Gallery</h2>
      <ProductGallery />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '../components/Card.vue';
import Box from '../components/Box.vue';
import Frame from '../components/Frame.vue';
import Shape from '../components/Shape.vue';
import ProductGallery from '../components/ProductGallery.vue';

const cards = ref([
  { id: 1, title: 'Card 1', description: 'Description 1', image: 'image1.jpg' },
  { id: 2, title: 'Card 2', description: 'Description 2', image: 'image2.jpg' },
  { id: 3, title: 'Card 3', description: 'Description 3', image: 'image3.jpg' },
]);

const boxes = ref([
  { id: 1, content: 'Box 1', background: 'bg-blue-100' },
  { id: 2, content: 'Box 2', background: 'bg-green-100' },
  { id: 3, content: 'Box 3', background: 'bg-red-100' },
]);

const frames = ref([
  { id: 1, content: 'Frame 1', border: 'border-blue-500' },
  { id: 2, content: 'Frame 2', border: 'border-green-500' },
  { id: 3, content: 'Frame 3', border: 'border-red-500' },
]);

const shapes = ref([
  { id: 1, type: 'circle', color: 'bg-blue-500' },
  { id: 2, type: 'square', color: 'bg-green-500' },
  { id: 3, type: 'rectangle', color: 'bg-red-500' },
]);
</script>

<style scoped>
.futuristic-page {
  @apply bg-gray-100 min-h-screen;
}

.header {
  @apply text-center;
}

.cards-section,
.boxes-section,
.frames-section,
.shapes-section,
.product-gallery-section {
  @apply mb-8;
}
</style>
