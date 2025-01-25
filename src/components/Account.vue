<script setup lang="ts">
import { onMounted } from 'vue'
import Avatar from './Avatar.vue'
import { useUserStore } from '../stores/useUserStore'
import { useAuth } from '../composables/useAuth'
import { useProfile } from '../composables/useProfile'

const { loading, errorMsg, username, avatarUrl, getProfile, updateProfile } = useProfile()

const userStore = useUserStore()

onMounted(() => {
  getProfile(userStore.user)
})

function handleUpdateProfile() {
  updateProfile(userStore.user, username.value, avatarUrl.value)
}


const { signOut } = useAuth()

function handleSignOut() {
  signOut()
}
</script>

<template>
  <!-- Avatar Upload -->
  <div class="flex justify-center">
    <Avatar v-model:path="avatarUrl" @upload="handleUpdateProfile" :size="10" />
  </div>

  <div class="max-w-md mx-auto p-6 space-y-7 border border-p3-pink rounded-md shadow-md mix-blend-lighten text-primary">

    <div class="@container">
      <div class="flex flex-initial justify-between">
        <input v-model="username" required
          class="text-background-light font-semibold p-2 border border-secondary rounded-md focus:outline max-w-48" />
        <!-- Email (Disabled) -->
        <input type="email" :value="userStore.user?.email" disabled
          class="p-2 border border-secondary rounded-md focus:outline-none bg-gray-100 max-w-48" />
      </div>
      <button @click="handleUpdateProfile"
        class="px-4 py-2 bg-neon-springgreen rounded shadow hover:bg-p3-yellow transition-all duration-500 ease-fluid  disabled:opacity-50 w-28"
        :disabled="loading">{{ loading ? 'Updating...' : 'Update' }}</button>
      <div class="flex justify-end">
        <button @click="handleSignOut"
          class="px-4 py-2  bg-p3-red text-white rounded shadow hover:bg-p3-yellow transition-all duration-500 ease-fluid disabled:opacity-50 w-28"
          :disabled="loading">Sign-Out </button>
      </div>
    </div>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>