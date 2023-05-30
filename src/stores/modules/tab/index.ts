import { useRouterPush } from "@/composables";
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from "vue-router";
import {
  clearTabRoutes,
  getIndexInTabRoutesByRouteName,
  getTabRouteByVueRoute,
  getTabRoutes,
  isInTabRoutes,
  setTabRoutes,
} from "./helpers";
import { router } from "@/router";
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
    /** 重置Tab状态 */
    resetTabStore() {
      clearTabRoutes();
      this.$reset();
    },
    /** 缓存页签路由数据 */
    cacheTabRoutes() {
      setTabRoutes(this.tabs);
    },
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
     * 删除多页签
     * @param fullPath - 路由fullPath
     */
    removeTab(fullPath: string) {
      const { routerPush } = useRouterPush(false);

      const isActive = this.activeTab === fullPath;
      const updateTabs = this.tabs.filter((tab) => tab.fullPath !== fullPath);
      this.tabs = updateTabs;
      if (isActive && updateTabs.length) {
        const activePath = updateTabs[updateTabs.length - 1].fullPath;
        this.setActiveTab(activePath);
        routerPush(activePath);
      }
    },
    /**
     * 清空多页签
     * @param excludes - 保留的多页签的path
     */
    async clearTab(excludes: string[] = []) {
      const { routerPush } = useRouterPush(false);

      const homePath = this.homeTab.fullPath;
      const remain = [homePath, ...excludes];
      const hasActive = remain.includes(this.activeTab);
      const updateTabs = this.tabs.filter((tab) => remain.includes(tab.fullPath));
      if (hasActive) this.tabs = updateTabs;
      if (!hasActive && updateTabs.length) {
        const activePath = updateTabs[updateTabs.length - 1].fullPath;
        const navigationFailure = await routerPush(activePath);
        if (!navigationFailure) {
          this.tabs = updateTabs;
          this.setActiveTab(activePath);
        }
      }
    },
    /**
     * 清除所有多页签
     */
    clearAllTab() {
      this.clearTab();
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
    initTabStore(currentRoute: RouteLocationNormalizedLoaded) {
      // let tabs: GlobalTabRoute[] = []; // 不缓存多页签
      let tabs: GlobalTabRoute[] = getTabRoutes(); // 缓存多页签
      const routes = router.getRoutes();
      const hasHome = getIndexInTabRoutesByRouteName(tabs, this.homeTab.name as string) > -1;
      if (!hasHome && this.homeTab.name !== "root") {
        tabs.unshift(this.homeTab);
      }

      const isHome = currentRoute.fullPath === this.homeTab.fullPath;
      if (!isHome) {
        // 第一次进入的页面不是home
        const currentTab = getTabRouteByVueRoute(currentRoute);
        const hasCurrent = isInTabRoutes(tabs, currentRoute.fullPath);
        if (!hasCurrent) {
          // 当前页不在多页签里
          tabs.push(currentTab);
        }
      }
      // tabs不应该包含不存在的路由
      tabs = tabs.filter((tab) => routes.some((route) => route.name === tab.name));
      const activeTab = tabs.some((tab) => tab.name === currentRoute.name)
        ? currentRoute
        : this.homeTab;

      this.tabs = tabs;
      this.setActiveTab(activeTab.fullPath); // 设置激活的tab页签
    },
  },
});
