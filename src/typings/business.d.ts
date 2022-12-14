/** 权限 */
declare namespace Auth {
  /** 用户角色类型 */
  type RoleType = keyof typeof import("@/enum").EnumUserRole;

  interface UserInfo {
    userId: string;
    userName: string;
    userRole: RoleType;
  }
}
