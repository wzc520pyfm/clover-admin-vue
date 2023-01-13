/** 菜单项配置 */
type GlobalMenuOption = {
  key: string | symbol;
  label: string;
  routeName: string | symbol;
  routePath: string;
  icon?: string;
  children?: Array<GlobalMenuOption>;
};

/** 多页签Tab路由 */
type GlobalTabRoute = Pick<
  import("vue-router").RouteLocationNormalizedLoaded,
  "name" | "fullPath" | "meta"
>;

/** 请求相关类型 */
declare namespace Service {
  /**
   * 请求的错误类型
   *  - axios: axios错误: 网络错误、请求超时、默认的兜底错误
   *  - http：请求成功， 响应的http状态非200
   *  - backend：请求成功，响应的http状态码为200，由后端定义的业务错误
   */
  type RequestErrorType = "axios" | "http" | "backend";

  /** 请求错误 */
  interface RequestError {
    /** 错误类型 */
    type: RequestErrorType;
    /** 错误码 */
    code: string | number;
    /** 错误信息 */
    msg: string;
  }

  /** 后端接口返回的数据结构配置 */
  interface BackendResultConfig {
    /** 后端请求的返回状态码的属性字段 */
    codeField: string;
    /** 后端请求的返回数据的属性字段 */
    dataField: string;
    /** 后端请求的返回消息的属性字段 */
    msgField: string;
    /** 后端业务上定义的成功请求的状态 */
    successCode: number | string;
  }

  /** 自定义的请求成功结果 */
  interface SuccessResult<T = any> {
    /** 请求错误信息 */
    error: null;
    /** 请求返回的数据 */
    data: T;
  }

  /** 自定义的请求失败结果 */
  interface FailedResult {
    /** 请求错误信息 */
    error: RequestError;
    /** 请求返回的数据 */
    data: null;
  }

  /** 自定义的请求结果 */
  type RequestResult<T = any> = SuccessResult<T> | FailedResult<T>;
}
