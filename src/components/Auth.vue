<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const email = ref('')
const password = ref('')
const { loading, errorMsg, signIn } = useAuth()

function handleSignIn() {
  signIn(email.value, password.value)
}
</script>

<template>
  <div class="max-w-md mx-auto px-6 py-12">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" v-model="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div class="mb-4">
      <input placeholder="password" v-model="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent" />
    </div>
      <button class="button block w-full px-4 py-2 text-p3-light font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="handleSignIn" :disabled="loading">Sign In</button>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>