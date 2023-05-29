/**
 * 根据用户权限过滤路由
 * @param routes - 权限路由
 * @param permission - 权限
 */
export function filterAuthRoutesByUserPermission(
  routes: AuthRoute.Route[],
  permission: Auth.RoleType
): AuthRoute.Route[] {
  return routes.flatMap((route) => filterAuthRouteByUserPermission(route, permission));
}

/**
 * 根据用户权限过滤单个路由
 * @param route - 单个路由
 * @param permission - 权限
 */
function filterAuthRouteByUserPermission(
  route: AuthRoute.Route,
  permission: Auth.RoleType
): AuthRoute.Route[] {
  const filterRoute = { ...route };
  const hasPermission =
    /** 路由未声明权限，则默认允许查看 */
    !route.meta.permissions ||
    /** 超级管路元可查看所有路由 */
    permission === "super" ||
    /** 路由的权限包含用户的权限，则允许查看 */
    route.meta.permissions.includes(permission);

  if (filterRoute.children) {
    const filterChildren = filterRoute.children.flatMap((item) =>
      filterAuthRouteByUserPermission(item, permission)
    );
    Object.assign(filterRoute, { children: filterChildren });
  }
  return hasPermission ? [filterRoute] : [];
}
