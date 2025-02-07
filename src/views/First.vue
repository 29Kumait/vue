<template>
  <main class="space-y-16 bg-light">
    <!-- Section 1 -->
       <section
      class="h-screen flex items-center justify-center bg-gradient-to-b from-[var(--color-background-dark)] to-[var(--color-background-dark)]"
    >
      <div class="text-center">
        <h1 class="text-[var(--color-neon-springgreen)] text-6xl font-bold drop-shadow-md">  Page: HOME  </h1>
        <p class="text-[var(--color-neon-lime)] mt-4 text-lg">
          colors, and technology.
        </p>
      </div>
    </section>

    <!-- Section 2 -->
    <section
      class="h-screen flex items-center justify-center"
      :style="{
        background: 'linear-gradient(90deg,' +
          'var(--color-primary) 30%,' +
          'var(--color-secondary) 30% 70%,' +
          'var(--color-accent) 70%)',
      }"
    >
      <article class="perspective-distant">
        <div
          class="transform-3d rotate-x-12 rotate-y-6 shadow-xl transition-all duration-500 hover:rotate-x-8 hover:rotate-y-2"
        >
          <div class="bg-white p-8 rounded-xl">
            <h3 class="text-xl font-bold text-gray-900">Realistic 3D Design</h3>
            <p class="text-gray-700">
            powered by Tailwind CSS Beta 4.
            </p>
          </div>
        </div>
      </article>
    </section>

    <!-- Section 3 -->
    <section
      class="h-screen flex items-center justify-center"
      :style="{ backgroundColor: 'var(--color-primary)' }"
    >
      <article class="perspective-distant">
        <div
          class="transform-3d rotate-x-12 rotate-y-6 shadow-xl transition-all duration-500 hover:rotate-x-8 hover:rotate-y-2"
        >
          <div class="bg-white p-8 rounded-xl">
            <h3 class="text-xl font-bold text-gray-900">Mono Advanced Style</h3>
            <p class="text-gray-700">
              This a Section 
            </p>
          </div>
        </div>
      </article>
    </section>

    <!--  Cards -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      <div
        v-for="color in ['primary', 'secondary', 'accent']"
        :key="color"
        :class="`bg-[var(--color-${color})] p-8 rounded-xl shadow-lg transform hover:scale-105 transition`"
      >
        <h2 class="text-white text-2xl font-semibold capitalize">
          {{ color }} Section
        </h2>
        <p class="text-white mt-2">
         OKLCH and Tailwind
        </p>
      </div>
    </section>

    <!-- P3 Colors -->
    <div class="bg-p3-blue text-white p-4 rounded">
      <h1 class="text-2xl">Display P3 Color</h1>
    </div>
    <div class="bg-oklch-pink text-oklch-green p-4 rounded mt-4">
      <h1 class="text-2xl">OKLCH Colors</h1>
    </div>
    <section
      class="h-screen bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] flex items-center justify-center"
    >
      <article class="perspective-distant">
        <div
          class="transform-3d rotate-x-12 rotate-y-6 shadow-xl transition-all duration-500 hover:rotate-x-8 hover:rotate-y-2"
        >
          <div class="bg-white p-8 rounded-xl">
            <h3 class="text-xl font-bold text-gray-900">Realistic 3D Design</h3>
            <p class="text-gray-700">
              Dynamic, Colors
            </p>
          </div>
        </div>
      </article>
    </section>

    <!-- Section -->
    <section class="bg-p3-red text-white p-16">
      <h2 class="text-3xl">Section 1: P3 Red</h2>
      <p>Content with vibrant P3 red background.</p>
    </section>
    <section class="bg-oklch-green text-gray-800 p-16">
      <h2 class="text-3xl">Section 2: OKLCH Green</h2>
      <p>Content with harmonious OKLCH green background.</p>
    </section>
    <section class="bg-p3-blue text-white p-16">
      <h2 class="text-3xl">Section 3: P3 Blue</h2>
      <p>Content with vibrant P3 blue background.</p>
    </section>
    <div
      class="bg-linear-45 from-oklch-pink via-oklch-purple to-oklch-blue h-screen flex items-center justify-center"
    >
      <h1 class="text-white text-4xl">Diagonal OKLCH Gradient</h1>
    </div>
    <section
      class="bg-oklch-pink text-white p-16 transition-all duration-500 ease-fluid hover:bg-oklch-purple"
    >
      <h2 class="text-3xl">Interactive Section</h2>
      <p>Hover to transition to OKLCH Purple.</p>
    </section>

    <!-- Split Layout -->
    <div class="flex h-screen">
      <div class="w-1/2 bg-p3-blue text-white flex items-center justify-center">
        <div>
          <h2 class="text-3xl">Left Side</h2>
          <p> P3 Blue background.</p>
        </div>
      </div>
      <div class="w-1/2 bg-oklch-yellow text-gray-800 flex items-center justify-center">
        <div>
          <h2 class="text-3xl">Right Side</h2>
          <p> OKLCH Yellow background.</p>
        </div>
      </div>
    </div>

    <!-- Card Layout -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-16">
      <div class="bg-white shadow-lg rounded-lg p-6 border-l-4 border-p3-red">
        <h3 class="text-2xl mb-2">Card 1</h3>
        <p>Content with a P3 red accent border.</p>
      </div>
      <div class="bg-white shadow-lg rounded-lg p-6 border-l-4 border-oklch-green">
        <h3 class="text-2xl mb-2">Card 2</h3>
        <p>Content with an OKLCH green accent border.</p>
      </div>
      <div class="bg-white shadow-lg rounded-lg p-6 border-l-4 border-p3-blue">
        <h3 class="text-2xl mb-2">Card 3</h3>
        <p>Content with a P3 blue accent border.</p>
      </div>
    </div>

    <!-- Responsive Colors -->
    <div class="bg-oklch-pink md:bg-oklch-purple lg:bg-oklch-blue p-16 text-white">
      <h2 class="text-3xl">Responsive Colors</h2>
      <p>Background color changes based on screen size.</p>
    </div>
    <div class="opacity-0 transition-opacity duration-700 ease-fluid hover:opacity-100">
      <p>Hover to smoothly fade in with fluid timing.</p>
    </div>
    <div class="transform transition-transform duration-300 ease-snappy hover:translate-x-4">
      <p>Hover to slide right with snappy timing.</p>
    </div>

    <!-- Buttons -->
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded transition-all duration-500 ease-fluid hover:bg-blue-700"
    >
      Hover Me
    </button>
    <button
      class="bg-green-500 text-white px-4 py-2 rounded transition-all duration-300 ease-snappy hover:bg-green-700"
    >
      Click
    </button>

    <!-- Delayed Hover Items -->
    <div class="space-y-4">
      <div class="opacity-0 transition-opacity duration-700 ease-fluid delay-100 hover:opacity-100">
        Item 1
      </div>
      <div class="opacity-0 transition-opacity duration-700 ease-fluid delay-200 hover:opacity-100">
        Item 2
      </div>
      <div class="opacity-0 transition-opacity duration-700 ease-fluid delay-300 hover:opacity-100">
        Item 3
      </div>
    </div>

    <!-- Interactive Card -->
    <div class="bg-oklch-pink p-8 rounded-lg transition-transform duration-500 ease-snappy hover:scale-105 hover:rotate-6">
      <h3 class="text-xl">Interactive Card</h3>
      <p>Hover to scale up and rotate.</p>
    </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>