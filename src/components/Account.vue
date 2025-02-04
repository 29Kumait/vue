<script setup lang="ts">
import { computed, onServerPrefetch, onMounted, ref } from 'vue'
import Avatar from './Avatar.vue'
import { useUserStore } from '../stores/useUserStore'
import { useAuth } from '../composables/useAuth'
import { useProfile } from '../composables/useProfile'

const { username, avatarUrl, getProfile, updateProfile } = useProfile()
// User store for auth info
const userStore = useUserStore()

// Local loading & error
const loading = ref<boolean>(false)
const errorMsg = ref<string>('')

// --- 1) Single serverPrefetch call:
onServerPrefetch(async () => {
  await fetchProfileIfLoggedIn()
})

// --- 2) Single onMounted call:
onMounted(async () => {
  await fetchProfileIfLoggedIn()
})

// DRY fetch function
async function fetchProfileIfLoggedIn(): Promise<void> {
  if (!userStore.user) return
  loading.value = true
  try {
    await getProfile(userStore.user)
  } catch (err) {
    errorMsg.value = (err as Error).message
    console.error('Account error:', err)
  } finally {
    loading.value = false
  }
}

// Format a date
function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

// Computed last sign-in
const formattedLastSignIn = computed(() => {
  return userStore.user?.last_sign_in_at
    ? formatDate(userStore.user.last_sign_in_at)
    : ''
})

// Update profile
function handleUpdateProfile(): void {
  updateProfile(userStore.user, username.value, avatarUrl.value)
}

// Sign out
const { signOut } = useAuth()
function handleSignOut(): void {
  signOut()
}
</script>

<template>
  <div class="account">
    <div v-if="loading">Loading profile...</div>
    <div v-else-if="errorMsg" class="error">{{ errorMsg }}</div>
    <div v-else>
      <p>Username: {{ username }}</p>
      <!-- <img :src="avatarUrl" alt="User Avatar" /> -->
    </div>
  </div>

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
      <!-- Avatar component -->
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
