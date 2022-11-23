import type { AuthRoute } from "@/typings/route";

/**
 * 权限路由转换为菜单
 * @param routes - 路由
 */
export function transformRouteToMenu(
  routes: AuthRoute.Route[],
  superPath?: string
): GlobalMenuOption[] {
  const globalMenu: GlobalMenuOption[] = [];
  routes.forEach((route) => {
    const { name, path, meta } = route;
    let menuChildren: GlobalMenuOption[] | undefined;
    const fullPath: string = `${superPath ? superPath + "/" : ""}${path}`;
    if (route.children) {
      menuChildren = transformRouteToMenu(route.children, fullPath);
    }
    const menuItem: GlobalMenuOption = {
      key: name,
      label: meta.title,
      routeName: name,
      routePath: fullPath,
      children: menuChildren,
    };
    globalMenu.push(menuItem);
  });

  return globalMenu;
}
