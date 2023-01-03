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

const GLOBAL_PAGE_INDEX = 1;
const GLOBAL_PAGE_SIZE = 10;
const GLOBAL_MAX_PAGE_SIZE = 100;
const SUCCESS = 200;
const MEAN_LESS_NUM = -1;
const MAX_NUMBER = 2 ** (32 - 1) - 1;

export {
  GLOBAL_PAGE_INDEX,
  GLOBAL_PAGE_SIZE,
  GLOBAL_MAX_PAGE_SIZE,
  SUCCESS,
  MEAN_LESS_NUM,
  MAX_NUMBER,
  // 常量
  GENDER,
  GENDER_OPTIONS,
  USER_STATUS,
  USER_STATUS_OPTIONS,
  // 常量枚举
  VALUE_CONSTANT,
  VALUE_CONSTANT_MAPPING,
};
