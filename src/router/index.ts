import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

/** Layout */
import Layout from "@/layout/index.vue";
import type { App } from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
    {
      path: "/map",
      component: Layout,
      redirect: "/map/index",
      children: [
        {
          path: "index",
          name: "mapView",
          component: () => import("@/views/plugin/map/index.vue"),
        },
      ],
    },
  ],
});

/** setup vue router. */
export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}
