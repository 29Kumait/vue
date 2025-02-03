<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { debounce } from 'lodash-es'

const email = ref<string>('')
const password = ref<string>('')

const { loading, errorMsg, signUp } = useAuth()

const handleSignUp = debounce(() => {
  signUp(email.value, password.value)
}, 300)
</script>

<template>
  <div class="max-w-md mx-auto px-6 py-12">
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
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm peer"
      />
      <p class="invisible peer-invalid:visible">invalid email address.</p>
    </label>
    <div class="mb-4">
      <input
        placeholder="password"
        type="password"
        v-model="password"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <button
      class="button block w-full px-4 py-2 bg-p3-pink text-white font-semibold rounded-md shadow-sm hover:bg-neon-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-a-cyan"
      @click="handleSignUp"
      :disabled="loading"
    >
      Sign Up
    </button>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>
