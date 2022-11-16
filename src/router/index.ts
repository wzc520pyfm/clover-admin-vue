import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "./routes";

/** Layout */
import Layout from "@/layout/index.vue";
import type { App } from "vue";
import { setupRouterGuard } from "./guard";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes],
});

/** setup vue router. */
export async function setupRouter(app: App) {
  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
}

export * from "./routes";
export * from "./modules";
