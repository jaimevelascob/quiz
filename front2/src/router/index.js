import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { isLoggedIn } from "../api/utils";

Vue.use(VueRouter);

import axios from "axios"; // Importando AXIOS
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "authToken"
);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue"),
    //RUTA PUBLICA
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/registrer",
    name: "Registrer",
    component: () => import("../views/Registrer.vue"),
    //RUTA PUBLICA
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    //RUTA PUBLICA
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/challengeQuestions",
    name: "ChallengeQuestions",
    component: () => import("../views/ChallengeQuestions.vue"),
    //RUTA PUBLICA
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/challenges",
    name: "Challenges",
    component: () => import("../views/Challenges.vue"),
    //RUTA PUBLICA
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/challengeid/:id",
    name: "ChallengeID",
    component: () => import("../views/ChallengeID.vue"),
    //RUTA PUBLICA
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/probando",
    name: "probando",
    component: () => import("../views/Probando.vue"),
    //RUTA PUBLICA
    meta: {
      allowAnonymous: true,
    },
  },
];

const router = new VueRouter({
  routes,
});
//COMPROBANDO CADA PÁGINA SI EL USER ESTÁ LOGEADA
router.beforeEach((to, from, next) => {
  //Si la ruta privada y la persona no tiene token
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});
export default router;
