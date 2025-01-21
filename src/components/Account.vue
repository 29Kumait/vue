<script setup lang="ts">
import { supabase } from '../supabase'
import { onMounted, ref } from 'vue'
import Avatar from './Avatar.vue'
import { useUserStore } from '../stores/useUserStore'

const loading = ref(true)
const username = ref('')
const avatar_url = ref('')

const userStore = useUserStore()

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const user = userStore.user
    if (!user) throw new Error('Not logged in!')

    const { data, error, status } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('user_id', user.id)
      .single()

    if (error && status !== 406) {
      throw error
    }

    if (data) {
      username.value = data.username || user.email // Default to email if username is null
      avatar_url.value = data.avatar_url || ''
    } else {
      // If no profile exists, create it with username as email
      await supabase.from('profiles').insert({
        user_id: user.id,
        username: user.email,
        avatar_url: null,
        updated_at: new Date(),
      })
      username.value = user.email || ''
      avatar_url.value = ''
    }
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const user = userStore.user
    if (!user) throw new Error('Not logged in!')

    const updates = {
      user_id: user.id,
      username: username.value || user.email, // Fallback to email
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    }

    // Check if the profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError
    }

    if (existingProfile) {
      // Update existing profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
      if (updateError) throw updateError
    } else {
      // Insert new profile
      const { error: insertError } = await supabase
        .from('profiles')
        .insert(updates)
      if (insertError) throw insertError
    }

    // Re-fetch profile to update the component state
    await getProfile()
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    await userStore.signOut()
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-6 border border-gray-300 rounded-md shadow-md bg-white text-gray-800">
    <form @submit.prevent="updateProfile" class="space-y-4">
      <!-- Avatar Upload -->
      <div class="flex justify-center">
        <Avatar v-model:path="avatar_url" @upload="updateProfile" :size="10" />
      </div>

      <!-- Username -->
      <div>
        <label for="username" class="block text-sm font-medium mb-1">Name</label>
        <input id="username" type="text" v-model="username" required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none" />
      </div>

      <!-- Email (Disabled) -->
      <div>
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <input id="email" type="email" :value="userStore.user?.email" disabled
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100" />
      </div>



      <!-- Buttons -->
      <div class="flex justify-between">
        <button type="submit"
          class="px-4 py-2 bg-neon-lime text-white rounded-md shadow hover:bg-neon-pink disabled:opacity-50"
          :disabled="loading">
          {{ loading ? 'Updating...' : 'Update' }}
        </button>

        <button type="button" @click="signOut"
          class="px-4 py-2 bg-neon-fuchsia text-white rounded-md shadow hover:bg-neon-pink disabled:opacity-50"
          :disabled="loading">
          Sign Out
        </button>
      </div>
    </form>
  </div>
</template>