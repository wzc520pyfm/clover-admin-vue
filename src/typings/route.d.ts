/** 权限路由 */
declare namespace AuthRoute {
  /** 路由描述 */
  interface RouteMeta {
    /** 路由标题(document.title或者菜单的名称) */
    title: string;
    /** 权限, 为空则表示不需要权限 */
    permissions?: Auth.RoleType[];
    /** 缓存页面 */
    keepAlive?: boolean;
    /** 图标 */
    icon?: string;
    /** 是否在菜单中隐藏此项, 其子菜单不受影响 */
    hidden?: boolean;
    /** 唯一标识, 独立于name的标识, 可用于标识主页路由 */
    key?: string;
    /** 外链链接 */
    href?: string;
    /** 路由顺序, 调整菜单排序 */
    order?: number;
  }

  type Lazy<T> = () => Promise<T>;

  type RouteComponent = import("vue-router").RouteComponent;

  type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;

  /** 路由类型结构 */
  interface Route {
    /** 路由名称 */
    name: string | symbol;
    /** 路由路径 */
    path: string;
    /** 路由重定向 */
    redirect?: string;
    /** 路由组件 */
    component?: RawRouteComponent;
    /** 子路由 */
    children?: Route[];
    /** 路由属性 */
    meta: RouteMeta;
    /** 是否在菜单中完全隐藏, 其子菜单也将隐藏 */
    hidden?: boolean;
  }
}
