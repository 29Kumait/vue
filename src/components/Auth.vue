<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const loading = ref(false)
const email = ref('')
const password = ref('') // Add a ref for the password

const handleLogin = async () => {
  try {
    loading.value = true
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value, // Use the password ref
    })
    if (error) throw error
    alert('Successfully logged in!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <div>
        <input class="inputField" required type="email" placeholder="... email" v-model="email" />
      </div>
      <div>
        <input class="inputField" required type="password" placeholder="... password" v-model="password" /> <!-- Add password input -->
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Sign In'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>