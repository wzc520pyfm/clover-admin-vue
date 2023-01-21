/** 将路由路径转换成路由名字 */
export function transformRoutePathToRouteName(path: string): string {
  if (path === "/") return "root";

  const pathSplitMark = "/";
  const routeSplitMark = "_";

  const name = path.split(pathSplitMark).slice(1).join(routeSplitMark);

  return name;
}
