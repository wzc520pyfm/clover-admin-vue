import type { AuthRoute } from "@/typings/route";

/**
 * 路由排序
 * @param routes - 路由
 */
export function sortRoutes(routes: AuthRoute.Route[]) {
  return routes.sort((next, pre) => Number(next.meta?.order ?? 0) - Number(pre.meta?.order ?? 0));
}

/**
 * 处理路由模块
 * @param modules - 路由模块
 */
export function handleModuleRoutes(modules: Record<string, { default: AuthRoute.Route }>) {
  const routes: AuthRoute.Route[] = [];
  Object.keys(modules).forEach((key) => {
    const route = modules[key].default;
    routes.push(route);
  });

  return sortRoutes(routes.flat(1));
}
