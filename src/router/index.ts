import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/LoginComponent.vue"),
    //component: LoginComponent,
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/components/HomeComponent.vue"),
    //component: HomeComponent,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/configuracoes/usuariosFabrica",
    name: "usuariosFabrica",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/components/UsuariosFabricaComponent.vue"),
    //component: UsuariosFabricaComponent,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/configuracoes/paginasAPercorrer",
    name: "paginasAPercorrer",
    component: () => import("@/components/PaginasAPercorrerComponent.vue"),
    //component: PaginasAPercorrerComponent,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/configuracoes/feriadosEDatas",
    name: "feriadosEDatas",
    component: () => import("@/components/FeriadosEDatasComponent.vue"),
    //component: FeriadosEDatasComponent,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/extratorSustentacaoMensal",
    name: "extratorSustentacaoMensal",
    component: () => import("@/components/ExtratorComponent.vue"),
    //component: ExtratorComponent,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  let auth = false;

  if (sessionStorage.getItem("Logged")) {
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
