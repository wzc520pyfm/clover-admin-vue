export {};

declare module "vue" {
  // export interface ComponentCustomOptions { }

  /** 定义在vue实例上自定义的全局属性的类型 */
  export interface ComponentCustomProperties {
    $filters: typeof import("@/utils/filters");
  }
  // export interface GlobalDirectives { }
  // export interface GlobalComponents { }
}
