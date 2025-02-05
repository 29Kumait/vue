// src/router.ts
import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import { useUserStore } from '../stores/useUserStore';

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
];

export function createRouter(isServer = import.meta.env.SSR) {
  const router = _createRouter({
    history: isServer ? createMemoryHistory() : createWebHistory(),
    routes,
    // Replacing the scrollBehavior configuration to fix the out commented code:
    scrollBehavior: (to) => {
      if (to.hash && to.hash.trim() !== '') {
        return { behavior: 'smooth', el: to.hash, top: -80 };
      } else {
        return { left: 0, top: 0 };
      }
    },
    // scrollBehavior: (to) => ({
    //   el: to.hash,
    //   behavior: 'smooth',
    //   top: -80,
    // }),
  });

  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore();
    try {
      if (!userStore.user) {
        await userStore.fetchUserSession();
      }
      if (to.meta.requiresAuth) {
        return userStore.isAuthenticated ? next() : next({ name: 'Auth' });
      }
      if (to.name === 'Auth' && userStore.isAuthenticated) {
        return next({ name: 'Second' });
      }
      next();
    } catch (error) {
      console.error('Navigation error:', error);
      next({ name: 'Auth' });
    }
  });

  return router;
}
