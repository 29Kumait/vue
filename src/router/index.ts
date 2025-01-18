import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'

import Home from '../views/Home.vue'
import Second from '../views/Second.vue'
import Auth from '../components/Auth.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/second',
    name: 'Second',
    component: Second,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore()

  // Loading the user session from supabase,
  if (userStore.user === null) {
    await userStore.fetchUserSession()
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'Auth' })
  } else {
    next()
  }
})

export default router