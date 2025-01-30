<script setup lang="ts">
import { onMounted } from 'vue'
import Avatar from './Avatar.vue'
import { useUserStore } from '../stores/useUserStore'
import { useAuth } from '../composables/useAuth'
import { useProfile } from '../composables/useProfile'

const { loading, errorMsg, username, avatarUrl, getProfile, updateProfile } = useProfile()

const userStore = useUserStore()

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};


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

  <div class="@container  text-text">
    <div class="flex flex-col justify-center items-center space-y-4">
      <input type="email" :value="userStore.user?.email" disabled
        class="p-2 border border-secondary rounded-md focus:outline-dotted bg-p3-accent text-p3-cyan  max-w-48" />
      <p class="text-xs">{{ userStore.user?.last_sign_in_at ? formatDate(userStore.user.last_sign_in_at) : '' }}</p>
    </div>
    <div class="max-w-md mx-auto p-6 space-y-7 border border-p3-yellow rounded-md shadow-md ">
      <Avatar v-model:path="avatarUrl" @upload="handleUpdateProfile" :size="10" />
    </div>


    <div class="@container">
      <div class="flex flex-initial justify-between text-sky-900">
        <label class="block">
          <input v-model="username" required
            class="peer  p-2 border border-secondary rounded-md focus:outline-none font-bold max-w-48" />
          <p class="invisible peer-invalid:visible">Please add you name!</p>
        </label>
      </div>
      <button @click="handleUpdateProfile"
        class="px-4 py-2 bg-p3-teal text-white rounded shadow hover:bg-p3-yellow transition-all duration-500 ease-fluid  disabled:opacity-50 w-28"
        :disabled="loading">{{ loading ? 'Updating...' : 'Update' }}</button>
    </div>
  </div>



  <div class="flex justify-end">
    <button @click="handleSignOut"
      class="px-4 py-2  bg-p3-red text-white rounded shadow hover:bg-p3-yellow transition-all duration-500 ease-fluid disabled:opacity-50 w-28"
      :disabled="loading">Sign-Out </button>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>


</template>