import type { RawRouteComponent } from "vue-router";
/** 权限路由 */
declare namespace AuthRoute {
  /** 路由描述 */
  interface RouteMeta {
    /** 路由标题 */
    title: string;
    /** 是否在菜单中隐藏此项, 其子菜单不受影响 */
    hidden?: boolean;
  }

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