import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from "vue-router";
import { getLocal, setLocal } from "@/utils";
import { EnumStorageKey } from "@/enum";

/**
 * 根据vue-route路由获取tab路由
 * @param route
 */
export function getTabRouteByVueRoute(
  route: RouteRecordNormalized | RouteLocationNormalizedLoaded
) {
  const fullPath = hasFullPath(route) ? route.fullPath : route.path;
  const tabRoute: GlobalTabRoute = {
    name: route.name,
    fullPath,
    meta: route.meta,
  };
  return tabRoute;
}

/**
 * 获取页签在多页签中的索引
 * @param tabs - 多页签数据
 * @param fullPath - 页签的路径
 */
export function getIndexInTabRoutes(tabs: GlobalTabRoute[], fullPath: string) {
  return tabs.findIndex((tab) => tab.fullPath === fullPath);
}

/**
 * 根据路由名称获取该页签在多页签数据中的索引
 * @param tabs - 多页签数据
 * @param routeName - 路由名称
 */
export function getIndexInTabRoutesByRouteName(tabs: GlobalTabRoute[], routeName: string) {
  return tabs.findIndex((tab) => tab.name === routeName);
}

/**
 * 判断页签是否在多页签数据中
 * @param tabs - 多页签数据
 * @param fullPath - 页签的路径
 */
export function isInTabRoutes(tabs: GlobalTabRoute[], fullPath: string) {
  return getIndexInTabRoutes(tabs, fullPath) > -1;
}

/**
 * 判断路由是否有fullPath属性
 * @param route 路由
 */
function hasFullPath(
  route: RouteRecordNormalized | RouteLocationNormalizedLoaded
): route is RouteLocationNormalizedLoaded {
  return Boolean((route as RouteLocationNormalizedLoaded).fullPath);
}

/**
 * 获取缓存的多页签
 */
export function getTabRoutes() {
  const routes: GlobalTabRoute[] = [];
  const data = getLocal<GlobalTabRoute[]>(EnumStorageKey["multi-tab-routes"]);
  if (data) {
    routes.push(...data);
  }
  return routes;
}

/** 缓存多页签数据 */
export function setTabRoutes(data: GlobalTabRoute[]) {
  setLocal(EnumStorageKey["multi-tab-routes"], data);
}

/** 清空多页签数据 */
export function clearTabRoutes() {
  setTabRoutes([]);
}
