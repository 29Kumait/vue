<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search products..."
      class="p-2 border border-gray-300 rounded mb-4"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card
        v-for="product in filteredProducts"
        :key="product.id"
        :title="product.title"
        :description="product.description"
        :image="product.image"
        class="hover:shadow-lg transition-shadow duration-300"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Card from './Card.vue';

const searchQuery = ref('');
const products = ref([
  { id: 1, title: 'Product 1', description: 'Description 1', image: 'image1.jpg' },
  { id: 2, title: 'Product 2', description: 'Description 2', image: 'image2.jpg' },
  { id: 3, title: 'Product 3', description: 'Description 3', image: 'image3.jpg' },
  // Add more products as needed
]);

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.grid {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4;
}
</style>
