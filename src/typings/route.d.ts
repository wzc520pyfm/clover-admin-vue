import type { RawRouteComponent, RouteMeta } from "vue-router";

/** 路由描述 */
interface RouteMeta {
  /** 路由标题 */
  title: string;
}

/** 路由类型结构 */
interface Route extends RawRouteComponent {
  /** 路由属性 */
  meta?: RouteMeta;
}
