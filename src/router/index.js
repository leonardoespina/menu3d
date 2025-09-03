import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("../components/WelcomeScreen.vue"),
    meta: { public: true }, // 1. Acceso público para todos
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/RegisterScreen.vue"),
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
    // 2. Solo para usuarios NO autenticados. Si ya inició sesión, lo redirige.
    meta: { public: true, onlyUnauthenticated: true },
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("../components/MenuScreen.vue"),
    meta: { public: true }, // 3. Acceso público para todos
  },
  // --- Ejemplo de una ruta protegida ---
  // Descomenta este bloque para añadir una ruta que requiera login
  /*
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/Dashboard.vue'),
    meta: { requiresAuth: true } // Solo para usuarios autenticados
  }
  */
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guardián de navegación global
router.beforeEach((to, from, next) => {
  // Asegúrate de que la tienda de Pinia esté inicializada
  const authStore = useAuthStore();

  const isAuthenticated = authStore.isAuthenticated;

  // Caso 1: La ruta requiere autenticación
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si no está autenticado, redirigir a la página de login
    next({ name: "login" });
    return;
  }

  // Caso 2: La ruta es solo para usuarios no autenticados (como la página de login)
  if (to.meta.onlyUnauthenticated && isAuthenticated) {
    // Si ya está autenticado, redirigir al menú o a un dashboard
    next({ name: "menu" });
    return;
  }

  // Si ninguno de los casos anteriores se cumple, permite el acceso
  next();
});

export default router;
