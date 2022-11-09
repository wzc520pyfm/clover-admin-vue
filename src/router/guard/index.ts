import type { Router } from "vue-router";
import { handleRoutePermission } from "./permission";

/**
 * 路由守卫函数
 * @param router 路由实例
 */
export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始loading
    // ...
    // 页面跳转权限处理
    await handleRoutePermission(to, from, next);
  });
  router.afterEach((to, from) => {
    // 结束loading
    // ...
  });
}
