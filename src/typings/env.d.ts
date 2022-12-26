/**
 * 抉择
 *  YES or NO
 */
type YorN = "Y" | "N";

/**
 * 服务的环境类型
 *  - dev: 开发环境
 *  - test: 测试环境
 *  - prod: 生产环境
 */
type ServiceEnvType = "dev" | "test" | "prod";

/** 服务的环境配置 */
interface ServiceEnvConfig {
  /** 请求地址 */
  url: string;
  /**
   * 匹配路径的正则字符串, 用于拦截地址作转发代理(可以是任意以/开头的字符串, 单个/不起作用)
   *  - eg: urlPattern: /api, 路径/api/user会被匹配, 若不设置rewritten, 则会被转为/user
   */
  urlPattern: `/${api}`; // 模板类型写法see: https://github.com/microsoft/TypeScript/pull/40336
  /** 重写后的路径, 如果需要将/api重写为/abc-api, 则需要配置为rewritten: /abc-api */
  rewritten?: `/${api}`;
}
/** 服务的环境配置, 可能会有多个后端请求地址 */
type ServiceEnvConfigs = Array<ServiceEnvConfig>;

interface ImportMetaEnv {
  /** 后端服务的环境类型 */
  readonly VITE_SERVICE_ENV?: ServiceEnvType;
  /** 是否开启请求代理 */
  readonly VITE_HTTP_PROXY?: YorN;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
