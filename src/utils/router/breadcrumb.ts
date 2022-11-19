/**
 * 获取面包屑数据
 */
export function getBreadcrumbByRouteKey(activeKey: any, menus: any) {
  const breadcrumbMenu = getBreadcrumbMenu(activeKey, menus);
  return breadcrumbMenu;
}

/**
 * 根据菜单数据获取面包屑数据
 */
function getBreadcrumbMenu(activeKey: any, menus: any) {
  const breadcrumbMenu: any[] = [];
  menus.some((menu: any) => {
    console.log("menu", menu[0]);
    const flag = activeKey.includes(menu[0].name);
    if (flag) {
      breadcrumbMenu.push(...getBreadcrumbMenuItem(activeKey, menu[0]));
    }
    return flag;
  });
  return breadcrumbMenu;
}

/**
 * 根据单个菜单数据获取面包屑数据
 */
function getBreadcrumbMenuItem(activeKey: any, menu: any) {
  const breadcrumbMenu: any[] = [];
  if (activeKey === menu.name && !menu.meta.hidden) {
    breadcrumbMenu.push({
      key: menu.name,
      path: menu.path,
      title: menu.meta.title,
    });
  }
  if (activeKey.includes(menu.name) && menu.children && menu.children.length) {
    !menu.meta.hidden &&
      breadcrumbMenu.push({
        key: menu.name,
        path: menu.path,
        title: menu.meta.title,
      });
    breadcrumbMenu.push(
      ...menu.children.map((item: any) => getBreadcrumbMenuItem(activeKey, item)).flat(1)
    );
  }
  return breadcrumbMenu;
}
