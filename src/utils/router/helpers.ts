/** 将路由路径转换成路由名字 */
export function transformRoutePathToRouteName(path: string): string {
  if (path === "/") return "root";

  const pathSplitMark = "/";
  const routeSplitMark = "_";

  const name = path.split(pathSplitMark).slice(1).join(routeSplitMark);

  return name;
}

/**
 * 获取所有固定路由的名称集合
 * @param routes 固定路由
 */
export function getConstantRouteNames(routes: AuthRoute.Route[]) {
  return routes.flatMap((route) => getConstantRouteName(route));
}

/**
 * 获取所有固定路由的名称集合
 * @param routes 固定路由
 */
function getConstantRouteName(route: AuthRoute.Route) {
  const names = [route.name];
  if (route.children?.length) {
    names.push(...route.children!.flatMap((item) => getConstantRouteName(item)));
  }
  return names;
}
