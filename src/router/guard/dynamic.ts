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
      return;
    }

    await route.initAuthRoute();
    next();
  }

  return true;
}
