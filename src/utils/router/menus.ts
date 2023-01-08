/**
 * 路由不转换为菜单, 其子路由也不转换
 */
function hiddenMenu(route: AuthRoute.Route) {
  return Boolean(route.hidden);
}
/**
 * 当前路由不转换为菜单, 子路由不受影响
 */
function hiddenMenuCurrent(route: AuthRoute.Route) {
  return Boolean(route.meta.hidden);
}

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
      icon: meta.icon,
      children: menuChildren,
    };
    if (!hiddenMenu(route)) {
      if (!hiddenMenuCurrent(route)) {
        globalMenu.push(menuItem);
      } else {
        globalMenu.push(...(menuChildren as GlobalMenuOption[]));
      }
    }
  });

  return globalMenu;
}
