/** 菜单项配置 */
type GlobalMenuOption = {
  key: string | symbol;
  label: string;
  routeName: string | symbol;
  routePath: string;
  icon?: string;
  children?: Array<GlobalMenuOption>;
};

/** 多页签Tab路由 */
interface GlobalTabRoute
  extends Pick<import("vue-router").RouteLocationNormalizedLoaded, "name" | "fullPath" | "meta"> {}
