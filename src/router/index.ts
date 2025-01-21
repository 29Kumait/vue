import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useUserStore } from "../stores/useUserStore";

import First from "../views/First.vue";
import Second from "../views/Second.vue";
import Auth from "../components/Auth.vue";
import Signup from "../components/Signup.vue";
import Account from "../components/Account.vue";
import Avatar from "../components/Avatar.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "First",
    component: First,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/second",
    name: "Second",
    component: Second,
    meta: { requiresAuth: true },
  },
  {
    path: "/avatar",
    name: "Avatar",
    component: Avatar,
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },

  {
    path: "/account",
    name: "Account",
    component: Account,
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
