import { router, routes as staticRoutes } from "@/router";
import type { RouteRecordRaw } from "vue-router";

interface RouteState {
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  authRouteMode: "static" | "dynamic";
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 菜单 */
  menus: any[]; // 类型待定
}

export const useRouteStore = defineStore("route-store", {
  state: (): RouteState => ({
    authRouteMode: "static", // 权限路由模式(此字段预留): 前端静态指定/后端动态获取
    isInitAuthRoute: false,
    menus: [],
  }),
  actions: {
    /**
     * 处理权限路由
     * @param routes - 权限路由
     */
    handleAuthRoutes(routes: RouteRecordRaw[]) {
      this.menus = routes; // TODO: 将权限路由经处理赋值给菜单
      const vueRoutes = routes.flat(1); // TODO: 将权限路由转换为vue-router的路由
      vueRoutes.forEach((route) => {
        // 挂载路由
        router.addRoute(route);
      });
      router.addRoute({
        path: "/:catchAll(.*)",
        component: () => import("@/views/exception/404/index.vue"), //这个是我自己的路径
      });
    },
    /** 初始化静态路由 */
    async initStaticRoute() {
      // ...
      const routes = staticRoutes; // TODO: 依据权限过滤路由
      // 处理权限路由并挂载
      this.handleAuthRoutes(routes);
    },
    /** 初始化权限路由 */
    async initAuthRoute() {
      const isDynamicRoute = this.authRouteMode === "static";
      if (isDynamicRoute) {
        await this.initStaticRoute();
      } else {
        // await this.initDynamicRoute();
      }

      this.isInitAuthRoute = true;
    },
  },
});
