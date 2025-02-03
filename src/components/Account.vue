<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Avatar from './Avatar.vue'
import { useUserStore } from '../stores/useUserStore'
import { useAuth } from '../composables/useAuth'
import { useProfile } from '../composables/useProfile'
import { debounce } from 'lodash-es'

// Get profile-related reactive state and methods
const { loading, errorMsg, username, avatarUrl, getProfile, updateProfile } = useProfile()

// Access the user store for authentication info
const userStore = useUserStore()

// Helper to format a date string
const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

// Computed property for formatted last sign-in date
const formattedLastSignIn = computed(() => {
  return userStore.user?.last_sign_in_at ? formatDate(userStore.user.last_sign_in_at) : ''
})

// When the component mounts, fetch the profile if the user exists
onMounted(() => {
  if (userStore.user) {
    getProfile(userStore.user)
  }
})

// Called when the user updates their profile
const handleUpdateProfile = debounce(() => {
  updateProfile(userStore.user, username.value, avatarUrl.value)
}, 300)

const { signOut } = useAuth()

const handleSignOut = debounce(() => {
  signOut()
}, 300)
</script>

<template>
  <div class="@container text-text">
    <div class="flex justify-between items-baseline">
      <input
        type="email"
        :value="userStore.user?.email"
        disabled
        class="p-2 border border-secondary rounded-md bg-p3-accent text-p3-cyan max-w-48"
      />
      <p class="text-s">Signed: {{ formattedLastSignIn }}</p>
    </div>
    <div class="max-w-md mx-auto p-3 shadow-md">
      <!-- Avatar component with v-model for the avatar URL -->
      <Avatar v-model:path="avatarUrl" @upload="handleUpdateProfile" :size="10" />
      <div class="flex flex-auto justify-end items-baseline text-sky-900">
        <span class="relative inline-block">
          <span class="relative bg-p3-yellow -skew-y-3 inline-block">Name:</span>
        </span>
        <label class="block justify-around">
          <input
            v-model="username"
            required
            class="peer p-2 focus:outline-none font-bold max-w-48"
          />
          <button
            @click="handleUpdateProfile"
            class="px-4 py-2 bg-p3-teal text-white rounded shadow hover:bg-p3-yellow transition-all duration-500 ease-fluid disabled:opacity-50 w-28"
            :disabled="loading"
          >
            {{ loading ? 'Updating...' : 'Update' }}
          </button>
          <p class="invisible peer-invalid:visible">Please add your name!</p>
        </label>
      </div>
    </div>
  </div>

  <div class="flex justify-end">
    <button
      @click="handleSignOut"
      class="px-4 py-2 bg-p3-red text-white rounded shadow hover:bg-p3-yellow transition-all duration-500 ease-fluid disabled:opacity-50 w-28"
      :disabled="loading"
    >
      Sign-Out
    </button>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>
