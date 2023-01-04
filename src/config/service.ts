/** 请求超时时间 */
export const REQUEST_TIMEOUT = 60 * 1000;

/** 错误信息的显示时间 */
export const ERROR_MSG_DURATION = 3 * 1000;

/** 默认的请求错误code */
export const DEFAULT_REQUEST_ERROR_CODE = "DEFAULT";

/** 默认的请求错误文本 */
export const DEFAULT_REQUEST_ERROR_MSG = "请求错误!";

/** 请求超时的错误code */
export const REQUEST_TIMEOUT_CODE = "ECONNABORTED";

/** 请求超时的错误文本 */
export const REQUEST_TIMEOUT_MSG = "请求超时!";

/** 网络不可用的code */
export const NETWORK_ERROR_CODE = "NETWORK_ERROR";

/** 网络不可用的错误文本 */
export const NETWORK_ERROR_MSG = "网络不可用!";

/** 请求不成功的状态码对应的错误 */
export const ERROR_STATUS = {
  400: "400: 请求出现语法错误!",
  401: "401: 未授权!",
  403: "403: 禁止访问!",
  404: "404: 请求的资源不存在!",
  405: "405: 不被允许的请求方法!",
  408: "408: 请求超时!",
  500: "500: 服务器发生意外错误!",
  501: "501: 暂未实施的请求!",
  502: "502: 网关错误!",
  503: "503: 服务不可用!",
  504: "504: 网关超时!",
  505: "505: 当前HTTP版本不支持该请求!",
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG,
};

/** 不弹出错误信息的code */
export const NO_ERROR_MSG_CODE: (string | number)[] = [];
