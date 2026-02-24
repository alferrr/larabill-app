import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/LoginPage/Login.vue";
import Register from "../pages/LoginPage/Register.vue";
import Dashboard from "../pages/Dashboard/dashboard.vue";
import Subscriptions from "../pages/Subscriptions/Subscriptions.vue";
import Bugdet from "../pages/Budget/Bugdet.vue";
import Reports from "../pages/Reports/Reports.vue";

const routes = [
  { path: "/", name: "Login", component: Login, meta: { guest: true } },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/subscriptions",
    name: "subscription",
    component: Subscriptions,
    meta: { requiresAuth: true },
  },

  {
    path: "/budget",
    name: "budget",
    component: Bugdet,
    meta: { requiresAuth: true },
  },
  {
    path: "/reports",
    name: "report",
    component: Reports,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "activeClass",
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return next({ name: "Login" });
  }

  if (to.meta.guest && token) {
    return next({ name: "dashboard" });
  }

  next();
});

export default router;
