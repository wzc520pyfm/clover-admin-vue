import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { generateDynamicRoutes } from "./dynamic";

/** 处理路由页面的权限 */
export async function handleRoutePermission(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // 动态路由
  const permission = await generateDynamicRoutes(to, from, next);
  if (!permission) return;
  // ...
  next();
}
