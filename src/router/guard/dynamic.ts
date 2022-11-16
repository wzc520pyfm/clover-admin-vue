import { useRouteStore } from "@/stores";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

/**
 * 动态路由
 */
export async function generateDynamicRoutes(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const route = useRouteStore();
  const isLogin = Boolean(/** getToken() */ true);

  // 初始化权限路由
  if (!route.isInitAuthRoute) {
    // 未登录
    if (!isLogin) {
      // 重定向到登录页面
      next({ name: "login" });
      return false;
    }
    await route.initAuthRoute();
    if (to.name === "not-found-page") {
      // 动态路由没有加载导致被not-found-page路由捕获，等待权限路由加载好了，回到之前的路由
      // 若路由是从根路由重定向过来的，重新回到根路由
      const ROOT_ROUTE_NAME = "root";
      const path = to.redirectedFrom?.name === ROOT_ROUTE_NAME ? "/" : to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  return true;
}
