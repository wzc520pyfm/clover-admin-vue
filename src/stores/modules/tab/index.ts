import { useRouterPush } from "@/composables";
import type { RouteLocationNormalized, Router } from "vue-router";
import { getTabRouteByVueRoute, isInTabRoutes } from "./helpers";
interface TabState {
  /** 多页签数据 */
  tabs: GlobalTabRoute[];
  /** 多页签首页 */
  homeTab: GlobalTabRoute;
  /** 当前激活状态的页签(路由fullPath) */
  activeTab: string;
}

export const useTabStore = defineStore("tab-store", {
  state: (): TabState => ({
    tabs: [],
    homeTab: {
      name: "root",
      fullPath: "/",
      meta: {
        title: "Root",
      },
    },
    activeTab: "",
  }),
  getters: {
    /** 当前激活状态的页签索引 */
    activeTabIndex(state) {
      const { tabs, activeTab } = state;
      return tabs.findIndex((tab) => tab.fullPath === activeTab);
    },
  },
  actions: {
    /**
     * 设置激活的页签
     * @param fullPath - 路由fullPath
     */
    setActiveTab(fullPath: string) {
      this.activeTab = fullPath;
    },
    /**
     * 添加多页签
     * @param route - 路由
     */
    addTab(route: RouteLocationNormalized) {
      const tab = getTabRouteByVueRoute(route);

      if (isInTabRoutes(this.tabs, tab.fullPath)) {
        return;
      }

      this.tabs.push(tab);
    },
    /**
     * 点击单个tab
     * @param fullPath - 路由fullPath
     */
    handleClickTab(fullPath: string) {
      const { routerPush } = useRouterPush(false);
      const isActive = this.activeTab === fullPath;
      if (!isActive) {
        this.setActiveTab(fullPath);
        routerPush(fullPath);
      }
    },
    /**
     * 初始化首页页签路由
     * @param routeHomeName - 路由首页的name
     * @param router - 路由实例
     */
    initHomeTab(routeHomeName: string, router: Router) {
      const routes = router.getRoutes();
      const findHome = routes.find((item) => item.name === routeHomeName);
      if (findHome && !findHome.children.length) {
        // 有子路由则不能作为Tab
        this.homeTab = getTabRouteByVueRoute(findHome);
      }
    },
    /** 初始化Tab状态 */
    initTabStore() {
      const tabs: GlobalTabRoute[] = [];
      tabs.unshift(this.homeTab);

      this.tabs = tabs;
    },
  },
});
