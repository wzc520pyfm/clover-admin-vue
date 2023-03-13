import { useTabStore } from "@/stores";
import { useEventListener } from "@vueuse/core";

/** 全局事件 */
export function useGlobalEvents() {
  const tab = useTabStore();

  /** 页面离开时缓存多页签数据 */
  useEventListener(window, "beforeunload", () => {
    tab.cacheTabRoutes();
  });
}
