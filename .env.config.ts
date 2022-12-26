/// <reference path="./src/typings/env.d.ts" />
// 上述代码是为了让本文件中的代码在编译前正确引用到./src/typings/env.d.ts
// 即通过注释的方式, 告诉TS编译器去查找./src/typings/env.d.ts文件

/** 请求服务的环境配置 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfigs>;

/** 不同环境下的配置, 代理就写在这里 */
const serviceEnv: ServiceEnv = {
  dev: [
    /**
     * 代理:
     *  - 将http://127.0.0.1:5574/oss-api/xx代理到http://127.0.0.1:5976/clover-api/xx
     */
    {
      url: "http://127.0.0.1:5976",
      urlPattern: "/oss-api",
      rewritten: "/clover-api"
    }
  ],
  test: [],
  prod: []
}

/**
 * 获取当前环境下的请求服务配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv) {
  const { VITE_SERVICE_ENV = "dev" } = env;

  const config = serviceEnv[VITE_SERVICE_ENV];

  return config;
}

