/** http请求头的content-type类型 */
export enum EnumContentType {
  json = "application/json",
  formUrlencoded = "application/x-www-form-urlencoded",
  formData = "multipart/form-data",
}

/** 缓存的key */
export enum EnumStorageKey {
  /** 用户token */
  "token" = "__TOKEN__",
  /** 用户刷新token */
  "refresh-token" = "__REFRESH_TOKEN__",
  /** 用户信息 */
  "user-info" = "__USER_INFO__",
}

/** 数据类型 */
export enum EnumDataType {
  number = "[object Number]",
  string = "[object String]",
  boolean = "[object Boolean]",
  null = "[object Null]",
  undefined = "[object Undefined]",
  object = "[object Object]",
  array = "[object Array]",
  date = "[object Date]",
  regexp = "[object RegExp]",
  set = "[object Set]",
  map = "[object Map]",
  file = "[object File]",
}
