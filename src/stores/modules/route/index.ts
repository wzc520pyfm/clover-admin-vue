import { constantRoutes, router, routes as staticRoutes } from "@/router";
import {
  getCacheRoutes,
  getConstantRouteNames,
  transformRoutePathToRouteName,
  transformRouteToMenu,
} from "@/utils";
import type { RouteRecordName, RouteRecordRaw } from "vue-router";
import { useTabStore } from "../tab";
import { useAuthStore } from "../auth";
import { filterAuthRoutesByUserPermission } from "@/utils/router/auth";

interface RouteState {
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  authRouteMode: "static" | "dynamic";
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 路由首页name */
  routeHomeName: string;
  /** 菜单 */
  menus: GlobalMenuOption[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
}

export const useRouteStore = defineStore("route-store", {
  state: (): RouteState => ({
    authRouteMode: "static", // 权限路由模式(此字段预留): 前端静态指定/后端动态获取
    isInitAuthRoute: false,
    routeHomeName: transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH),
    menus: [],
    cacheRoutes: [],
  }),
  actions: {
    /** 重置路由store */
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },
    /** 重置路由数据, 保留固定路由 */
    resetRoutes() {
      const routes = router.getRoutes();
      routes.forEach((route) => {
        const name = route.name || "root";
        if (!this.isConstantRoute(name)) {
          router.removeRoute(name);
        }
      });
    },
    /**
     * 是否是固定路由
     * @param name - 路由名称
     */
    isConstantRoute(name: RouteRecordName) {
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      return constantRouteNames.includes(name);
    },
    /**
     * 是否是有效的固定路由
     * @param name - 路由名称
     */
    isValidConstantRoute(name: RouteRecordName) {
      const NOT_FOUND_PAGE_NAME = "not-found-page";
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME;
    },
    /**
     * 处理权限路由
     * @param routes - 权限路由
     */
    handleAuthRoutes(routes: AuthRoute.Route[]) {
      this.menus = transformRouteToMenu(routes.flat(1)); // 将权限路由经处理赋值给菜单
      const vueRoutes = routes.flat(1); // 将权限路由转换为vue-router的路由
      vueRoutes.forEach((route) => {
        // 挂载路由
        router.addRoute(route as unknown as RouteRecordRaw);
      });

      this.cacheRoutes = getCacheRoutes(vueRoutes); // 获取需要缓存的路由
    },
    /** 初始化静态路由 */
    async initStaticRoute() {
      const auth = useAuthStore();
      const routes = filterAuthRoutesByUserPermission(staticRoutes, auth.userInfo.userRole); // 依据权限过滤路由
      // 处理权限路由并挂载
      this.handleAuthRoutes(routes);
    },
    /** 初始化权限路由 */
    async initAuthRoute() {
      const { initHomeTab } = useTabStore();

      const isDynamicRoute = this.authRouteMode === "static";
      if (isDynamicRoute) {
        await this.initStaticRoute();
      } else {
        // await this.initDynamicRoute();
      }

      initHomeTab(this.routeHomeName, router);

      this.isInitAuthRoute = true;
    },
  },
});
