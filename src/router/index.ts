import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { constantRoutes } from "./routes";
import type { App } from "vue";
import { setupRouterGuard } from "./guard";

const { VITE_HASH_ROUTE = "N", VITE_BASE_URL } = import.meta.env;

export const router = createRouter({
  history:
    VITE_HASH_ROUTE === "Y" ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
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
