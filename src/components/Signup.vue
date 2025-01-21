<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

async function signUp() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    router.push('/second')
  } catch (err: unknown) {
    const error = err as Error
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div class="max-w-md mx-auto">
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input id="email" type="email" v-model="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input id="password" type="password" v-model="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <button
      @click="signUp"
      :disabled="loading"
      class="button block w-full px-4 py-2 bg-neon-cyan text-white font-semibold rounded-md shadow-sm hover:bg-neon-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-a-cyan"    >
      {{ loading ? 'Loading...' : 'Sign Up' }}
    </button>
  </div>
</template>

  
  <style scoped>  </style>