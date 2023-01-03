/** 用户性别 */
const GENDER: Record<UserManagement.GenderKey, string> = {
  MALE: "男",
  FEMALE: "女",
};

const GENDER_OPTIONS: Array<ConstantOptions<UserManagement.GenderKey>> = [
  { value: "MALE", label: GENDER["MALE"] },
  { value: "FEMALE", label: GENDER["FEMALE"] },
];

/** 用户状态 */
const USER_STATUS: Record<UserManagement.UserStatusKey, string> = {
  ENABLE: "启用",
  DISABLE: "禁用",
  DELETED: "已删除",
};

const USER_STATUS_OPTIONS: Array<ConstantOptions<UserManagement.UserStatusKey>> = [
  { value: "ENABLE", label: USER_STATUS["ENABLE"] },
  { value: "DISABLE", label: USER_STATUS["DISABLE"] },
  { value: "DELETED", label: USER_STATUS["DELETED"] },
];

// 常量枚举
const VALUE_CONSTANT = {
  GENDER: 1,
  USER_STATUS: 2,
};

const VALUE_CONSTANT_MAPPING = [
  {
    type: 1,
    data: GENDER_OPTIONS,
  },
  {
    type: 2,
    data: USER_STATUS_OPTIONS,
  },
];

export {
  GENDER,
  GENDER_OPTIONS,
  USER_STATUS,
  USER_STATUS_OPTIONS,
  // 常量枚举
  VALUE_CONSTANT,
  VALUE_CONSTANT_MAPPING,
};
