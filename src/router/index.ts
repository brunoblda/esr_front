import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeComponent from "@/components/HomeComponent.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/LoginComponent.vue"),
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: HomeComponent,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/configuracoes/usuariosFabrica",
    name: "UsuariosFabrica",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/components/UsuariosFabricaComponent.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/configuracoes/paginasAPercorrer",
    name: "PaginasAPercorrer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/components/PaginasAPercorrerComponent.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let auth = false;

  if (sessionStorage.getItem("token")) {
    auth = true;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth == false) {
      next({ path: "/login" });
    } else {
      next();
    }
  }

  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (auth == true) {
      next({ path: "/" });
    } else {
      next();
    }
  }
});

export default router;
