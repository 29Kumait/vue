import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  type RouteRecordRaw,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import { useUserStore } from '../stores/useUserStore' // adjust the path if needed

// 1) Define your routes array
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
  {
    path: '/futuristic',
    name: 'FuturisticPage',
    component: () => import('../views/FuturisticPage.vue'),
  },
]

// 2) Create a function that returns a new router each time
//    By default, use `import.meta.env.SSR` to detect server vs. client.
export function createRouter(isServer = import.meta.env.SSR): Router {
  const router: Router = _createRouter({
    history: isServer
      ? createMemoryHistory()        // SSR mode
      : createWebHistory(),          // Client mode
    routes,
  })

  // 3) Add your navigation guards here:
  router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
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

  // Error handling middleware
  router.onError((error) => {
    console.error('Router error:', error)
  })

  return router
}
