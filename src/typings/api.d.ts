// 后端接口返回的数据类型

/** 用户权益相关 */
declare namespace ApiAuth {
  /** token */
  interface Token {
    token: string;
  }
  /** 用户信息 */
  type UserInfo = Auth.UserInfo;
}

declare namespace ApiUserManagement {
  interface User {
    /** 用户id */
    id: string;
    /** 用户名 */
    username: string | null;
    /** 用户年龄 */
    age: number | null;
    /**
     * 用户性别
     *  - MALE: 男
     *  - FEMALE: 女
     */
    gender: "MALE" | "FEMALE" | null;
    /** 用户手机号 */
    phone: string;
    /**
     * 用户状态
     *  - ENABLE: 启用
     *  - DISABLE: 禁用
     *  - DELETED: 已删除
     */
    userStatus: "ENABLE" | "DISABLE" | "DELETED" | null;
  }
}
