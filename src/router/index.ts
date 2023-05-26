import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "decorator",
      component: () => import("../views/Decorator.vue"),
    },
    {
      path: "/trycatch",
      name: "trycatch",
      component: () => import("../views/TryCatch.vue"),
    },
  ],
});

export default router;
