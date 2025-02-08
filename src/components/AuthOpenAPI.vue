<script setup lang="ts">
import { ref } from 'vue'
import { useApi } from '../composables/useApi'

const email = ref<string>('')
const password = ref<string>('')

const { loading, error, signIn } = useApi()

function handleSignIn(): void {
  signIn(email.value, password.value)
}
</script>

<template>
  <div class="max-w-md mx-auto px-6 py-12">
    <label class="block mb-4 text-sm font-medium text-gray-700">
      <p class="after:ml-0.5 after:text-p3-red after:content-['*']">Email</p>
      <input
        type="email"
        v-model="email"
        class="peer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <p class="invisible peer-invalid:visible">Invalid email address.</p>
    </label>

    <div class="mb-4">
      <input
        placeholder="password"
        v-model="password"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
        type="password"
      />
    </div>
    <button
      class="button block w-full px-4 py-2 text-p3-light font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="handleSignIn"
      :disabled="loading"
    >
      Sign In
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
