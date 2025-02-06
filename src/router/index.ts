import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'
import { useUserStore } from '../stores/useUserStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'First',
    component: () => import('../views/First.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../components/Auth.vue'),
  },
  {
    path: '/second',
    name: 'Second',
    component: () => import('../views/Second.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/avatar',
    name: 'Avatar',
    component: () => import('../components/Avatar.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/Signup.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../components/Account.vue'),
    meta: { requiresAuth: true },
  },
]

// -> Create a function that returns a new router each time  to detect server vs. client. //    By default, use `import.meta.env.SSR`

export function createRouter(isServer = import.meta.env.SSR) {
  const router = _createRouter({
    history: isServer
      ? createMemoryHistory()        // SSR mode
      : createWebHistory(),          // Client mode
    routes,
  })

  // ->  Guards to protect routes that require auth
  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore()

    // Attempt session fetch if user not yet loaded:
    if (!userStore.user) {
      await userStore.fetchUserSession()
    }

    // Protect routes that require auth:
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
      return next({ name: 'Auth' })
    }

    // If already authenticated, redirect away from /auth to e.g. /second
    if (to.name === 'Auth' && userStore.isAuthenticated) {
      return next({ name: 'Second' })
    }

    next()
  })

  return router
}

