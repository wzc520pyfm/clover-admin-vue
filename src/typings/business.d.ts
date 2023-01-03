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

declare namespace UserManagement {
  interface User extends ApiUserManagement.User {}

  /**
   * 用户性别
   *  - MALE: 男
   *  - FEMALE: 女
   */
  type GenderKey = NonNullable<User["gender"]>;

  /**
   * 用户状态
   *  - ENABLE: 启用
   *  - DISABLE: 禁用
   *  - DELETED: 已删除
   */
  type UserStatusKey = NonNullable<User["userStatus"]>;
}
