import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("../components/WelcomeScreen.vue"), // Lazy loading
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"), // Lazy loading
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("../components/MenuScreen.vue"),
    meta: { preload: true }, // Lazy loading
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
