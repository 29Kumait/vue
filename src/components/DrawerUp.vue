<template>
  <Drawer>
    <!-- Sidebar header slot -->
    <template #sidebar-header>
      <h1 class="text-center text-2xl tracking-tight font-bold px-6 py-12 lg:px-8">
        Account
      </h1>
    </template>

    <!-- Sidebar content slot -->
    <template #sidebar-content>
      <!-- If user is authenticated, show the Account component -->
      <div v-if="isAuthenticated">
        <Account />
      </div>

      <!-- Otherwise, show Auth/Signup options -->
      <div v-else>
        <div class="@container">
          <div v-if="isSignupMode">
            <Signup />
          </div>
          <div v-else>
            <Auth />
          </div>
        </div>

        <!-- Toggle between Login and Sign Up -->
        <div class="flex justify-around mb-4">
          <button @click="isSignupMode = false" :class="{ 'font-bold': !isSignupMode }">
            Login
          </button>
          <button @click="isSignupMode = true" :class="{ 'font-bold': isSignupMode }">
            Sign Up
          </button>
        </div>
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted , onServerPrefetch} from 'vue'
import Drawer from './Drawer.vue'
import { useUserStore } from '../stores/useUserStore'
import Account from './Account.vue'
import Auth from './Auth.vue'
import Signup from './Signup.vue'
const userStore = useUserStore()

onServerPrefetch(async () => {
  await userStore.fetchUserSession()
})

onMounted(async () => {
  await userStore.fetchUserSession()
})

const isAuthenticated = computed<boolean>(() => userStore.isAuthenticated)
const isSignupMode = ref<boolean>(false)
</script>