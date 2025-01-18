<script setup lang="ts">
import Drawer from './Drawer.vue'
import { ref, onMounted } from 'vue'
import Account from './Account.vue'
import Auth from './Auth.vue'
import Signup from './Signup.vue'
import { supabase } from '../supabase'

const session = ref<any>()
const loading = ref(false)

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  supabase.auth.getSession().then(({ data }: { data: any }) => {
    session.value = data.session
  })
  supabase.auth.onAuthStateChange((_: any, _session: any) => {
    session.value = _session
  })
})

</script>

<template>
  <Drawer>
    <template #sidebar-header>
      <h1 class="text-xl font-bold">Title</h1>
    </template>

    <template #sidebar-content>
      <ul>
          <li class="px-4 py-2 hover:bg-neon-pink cursor-pointer"> A</li>
          <li class="px-4 py-2 hover:bg-neon-lime cursor-pointer"> Item B</li>
          <li class="px-4 py-2 hover:bg-neon-cyan cursor-pointer">Menu Item C</li>
        </ul>
      <div class="container" style="padding: 50px 0 100px 0">
        <Account v-if="session" :session="session" />
        <Auth v-else />
      </div>
      <div id="app">
        <Signup />
        <div>
          <button class="button" @click="signOut" :disabled="loading">
            Sign Out
          </button>
        </div>
      </div>
    </template>
    <h2 class="text-2xl font-bold text-gray-800"></h2>
  </Drawer>
</template>


