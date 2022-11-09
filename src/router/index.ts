import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "./routes";

/** Layout */
import Layout from "@/layout/index.vue";
import type { App } from "vue";
import { setupRouterGuard } from "./guard";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...constantRoutes,
    {
      path: "/home",
      component: Layout,
      redirect: "/home/index",
      children: [
        {
          path: "index",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
      ],
    },
    // {
    //   path: "/about",
    //   component: Layout,
    //   redirect: "/about/index",
    //   children: [
    //     {
    //       path: "index",
    //       name: "about",
    //       component: () => import("@/views/AboutView.vue"),
    //     },
    //   ],
    // },
    // {
    //   path: "/map",
    //   component: Layout,
    //   redirect: "/map/index",
    //   children: [
    //     {
    //       path: "index",
    //       name: "mapView",
    //       component: () => import("@/views/plugin/map/index.vue"),
    //     },
    //   ],
    // },
  ],
});

/** setup vue router. */
export async function setupRouter(app: App) {
  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
}

export * from "./routes";
export * from "./modules";
