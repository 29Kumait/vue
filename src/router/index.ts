import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
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
    path: "/second",
    name: "Second",
    component: () => import("../views/Second.vue"),
    meta: { requiresAuth: true },
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();

  if (!userStore.user) {
    await userStore.fetchUserSession();
  }

  // Force user to sign in page if they're not logged in.
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next({ name: "Auth" });
  }

  // If already logged in, block them from going to '/auth' page (optional)
  if (to.name === "Auth" && userStore.isAuthenticated) {
    return next({ name: "Second" });
  }

  next();
});

export default router;