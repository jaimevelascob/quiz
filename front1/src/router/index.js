import Vue from "vue";
import VueRouter from "vue-router";
import { isLoggedIn } from "../api/utils";

Vue.use(VueRouter);
//IMPORTAMOS SWEETALERT
import Swal from "sweetalert2";
import axios from "axios"; // Importando AXIOS
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "authToken"
);
const routes = [
  {
    path: "/about",
    name: "About",
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
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (isLoggedIn() === true) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Pero si ya estas logeado!",
        });
        next({
          path: "/challenges",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (isLoggedIn() === true) {
        next({
          path: "/challenges",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "*",
    name: "Error",
    component: () => import("../views/Error.vue"),
  },
  {
    path: "/challengeQuestions/:id",
    name: "ChallengeQuestions",
    component: () => import("../views/ChallengeQuestions.vue"),
    //RUTA PUBLICA
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (!to.meta.allowAnonymous && !isLoggedIn()) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Tienes que logearte!",
        });
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/challenges",
    name: "Challenges",
    component: () => import("../views/Challenges.vue"),
    //RUTA PUBLICA
  },
  {
    path: "/challenge/:id",
    name: "challenge",
    component: () => import("../views/ChallengeID.vue"),
    //RUTA PUBLICA
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/instrucciones",
    name: "Instrucciones",
    component: () => import("../views/Instrucciones.vue"),
    //RUTA PUBLICA
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      // RUTA PRIVADA
      allowAnonymous: false,
    },
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (!to.meta.allowAnonymous && !isLoggedIn()) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Tienes que logearte!",
        });
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/CreateChallenge",
    name: "CreateChallenge",
    component: () => import("../views/CreateChallenge.vue"),
    meta: {
      // RUTA PRIVADA
      allowAnonymous: false,
    },
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y la persona no tiene token
      if (!to.meta.allowAnonymous && !isLoggedIn()) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Tienes que logearte!",
        });
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  routes,
});
// //COMPROBANDO CADA PÁGINA SI EL USER ESTÁ LOGEADA
// router.beforeEach((to, from, next) => {
//   //Si la ruta privada y la persona no tiene token
//   if (!to.meta.allowAnonymous && !isLoggedIn()) {
//     next({
//       path: "/login",
//       query: {
//         redirect: to.fullPath,
//       },
//     });
//   } else {
//     next();
//   }
// });
export default router;
