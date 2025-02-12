<!-- filepath: /Users/kumait/Desktop/full/vue/src/components/SignupOpenAPI.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useApi } from '../composables/useApi'

const email = ref<string>('')
const password = ref<string>('')
const username = ref<string>('')

const { loading, errorMsg, signUp } = useApi()

function handleSignUp(): void {
  signUp(email.value, password.value, username.value)
}
</script>

<template>
  <div class="max-w-md mx-auto px-6 py-12">
    <!-- Username input -->
    <div class="mb-4">
      <input
        placeholder="username"
        v-model="username"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        type="text"
      />
    </div>
    <label class="block mb-4 text-sm font-medium text-gray-700">
      <span
        class="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-p3-light">
        <span class="relative after:ml-0.5 after:text-p3-red after:content-['*'] dark:text-gray-950">
          Email
        </span>
      </span>
      <input
        type="email"
        v-model="email"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm peer"
      />
    </label>
    <div class="mb-4">
      <input
        placeholder="password"
        type="password"
        v-model="password"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
      />
    </div>
    <button
      class="button block w-full px-4 py-2 bg-p3-pink text-white font-semibold"
      @click="handleSignUp"
      :disabled="loading"
    >
      Sign Up
    </button>
    <p v-if="errorMsg" class="errorMsg">{{ errorMsg }}</p>
  </div>
</template>