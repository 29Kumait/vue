// src/router.ts
import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useUserStore } from "../stores/useUserStore";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "First",
    component: () => import("../views/First.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../components/Auth.vue"),
  },
  {
    path: "/avatar",
    name: "Avatar",
    component: () => import("../components/Avatar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../components/Signup.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../components/Account.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/second",
    name: "Second",
    component: () => import("../views/Second.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/openapi",
    name: "OpenAPIPage",
    component: () => import("../views/OpenAPIPage.vue"),
  },
];

export function createRouter(isServer = import.meta.env.SSR) {
  const router = _createRouter({
    history: isServer ? createMemoryHistory() : createWebHistory(),
    routes,
  });

  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore();
    try {
      if (!userStore.user) {
        await userStore.fetchUserSession();
      }
      if (to.meta.requiresAuth) {
        return userStore.isAuthenticated ? next() : next({ name: "Auth" });
      }
      if (to.name === "Auth" && userStore.isAuthenticated) {
        return next({ name: "Second" });
      }
      next();
    } catch (error) {
      console.error("Navigation error:", error);
      next({ name: "Auth" });
    }
  });

  return router;
}
