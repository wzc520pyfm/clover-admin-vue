import type { App, Directive } from "vue";
import { usePermission } from "@/composables";

export type PermissionDirective = typeof permissionDirective;

/**
 * 鉴权函数
 * @param el 指令绑定到的元素
 * @param permission 权限
 */
function updateElVisible(el: HTMLElement, permission: Auth.RoleType | Auth.RoleType[]) {
  const { hasPermission } = usePermission();

  if (!permission) {
    throw new Error(`need roles: like v-permission="'admin'" or v-permission="['admin', 'test']"`);
  }
  if (!hasPermission(permission)) {
    el.parentElement?.removeChild(el);
  }
}

/**
 * 权限指令
 */
export const permissionDirective: Directive<HTMLElement, Auth.RoleType | Auth.RoleType[]> = {
  mounted(el, binding) {
    updateElVisible(el, binding.value);
  },
  beforeUpdate(el, binding) {
    updateElVisible(el, binding.value);
  },
};

export const VPermission = "permission";

export default function setupPermissionDirective(app: App) {
  app.directive(VPermission, permissionDirective);
}
