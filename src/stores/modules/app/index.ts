interface AppState {
  /** 侧边栏折叠状态 */
  sidebarCollapse: boolean;
}

export const useAppStore = defineStore("app-store", {
  state: (): AppState => ({
    sidebarCollapse: false,
  }),
  actions: {
    /** 切换侧边栏折叠状态 */
    toggleSidebarCollapse() {
      this.sidebarCollapse = !this.sidebarCollapse;
    },
  },
});
