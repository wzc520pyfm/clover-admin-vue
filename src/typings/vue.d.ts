export {};

// see: https://github.com/vuejs/core/pull/3399
declare module "vue" {
  // export interface ComponentCustomOptions { }

  /** 定义在vue实例上自定义的全局属性的类型 */
  export interface ComponentCustomProperties {
    $filters: typeof import("@/utils/filters");

    // 全局注册的自定义指令的类型(声明在此只是暂时的hack办法, 在未来应该声明在GlobalDirectives中), see: https://github.com/johnsoncodehk/volar/issues/465
    vPermission: import("@/directives/permission").PermissionDirective;
  }
  // 暂不生效, see: https://github.com/johnsoncodehk/volar/issues/465
  // export interface GlobalDirectives { }

  // export interface GlobalComponents { }
}
