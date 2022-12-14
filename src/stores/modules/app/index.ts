interface AppState {
  /** 重载页面(控制页面的显示) */
  reloadFlag: boolean;
  /** 侧边栏折叠状态 */
  sidebarCollapse: boolean;
}

export const useAppStore = defineStore("app-store", {
  state: (): AppState => ({
    reloadFlag: true,
    sidebarCollapse: false,
  }),
  actions: {
    /**
     * 重载页面
     *  - 触发页面的activated
     * @param duration - 重载的延迟时间(ms)
     */
    async reloadPage(duration = 0) {
      this.reloadFlag = false;
      await nextTick();
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true;
        }, duration);
      } else {
        this.reloadFlag = true;
      }
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
      }, 100);
    },
    /** // TODO: 强制重载页面(触发页面的mounted) */
    async forceReloadPage() {},
    /** 切换侧边栏折叠状态 */
    toggleSidebarCollapse() {
      this.sidebarCollapse = !this.sidebarCollapse;
    },
  },
});
