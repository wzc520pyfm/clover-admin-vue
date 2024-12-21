import { camelCase, upperFirst } from "lodash";
/**
 * 获取缓存的路由对应组件的名称
 * @param routes - 转换后的vue路由
 */
export function getCacheRoutes(routes: AuthRoute.Route[]) {
  const cacheNames: string[] = [];
  routes.forEach((route) => {
    // 仅需获取二级路由的缓存的组件名
    if (hasChildren(route)) {
      (route.children as AuthRoute.Route[]).forEach((item) => {
        if (isKeepAlive(item)) {
          // Convert the name of the route to the name of the component
          // eg： plugin_echarts => PluginEcharts
          cacheNames.push(upperFirst(camelCase(item.name as string)));
        }
      });
    }
  });
  return cacheNames;
}

/**
 * 路由是否缓存
 * @param route
 */
function isKeepAlive(route: AuthRoute.Route) {
  return Boolean(route?.meta?.keepAlive);
}
/**
 * 是否有二级路由
 * @param route
 */
function hasChildren(route: AuthRoute.Route) {
  return Boolean(route.children && route.children.length);
}
