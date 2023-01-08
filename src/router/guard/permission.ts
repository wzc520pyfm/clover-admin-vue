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

  // 外链路由, 从新标签打开，返回上一个路由
  if (to.meta.href) {
    window.open(to.meta.href);
    next({ path: from.fullPath, replace: true, query: from.query });
    return;
  }
  // ...
  next();
}
