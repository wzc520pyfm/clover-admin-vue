import type { ProxyOptions } from "vite";

/**
 * 创建proxy
 * @param isOpenProxy 是否启用proxy
 * @param envConfig 环境配置(不同环境有不用的环境配置)
 */
export function createViteProxy(
  isOpenProxy: boolean,
  envConfig: ServiceEnvConfigs
): Record<string, string | ProxyOptions> | undefined {
  if (!isOpenProxy) return undefined;

  const proxy: Record<string, string | ProxyOptions> = {};

  for (const config of envConfig) {
    Reflect.set(proxy, config.urlPattern, {
      target: config.url,
      changeOrigin: true,
      rewrite: (path: string) => {
        if (config.rewritten) {
          return path.replace(new RegExp(`^${config.urlPattern}`), config.rewritten);
        } else {
          return path.replace(new RegExp(`^${config.urlPattern}`), "");
        }
      },
    });
  }

  return proxy;
}
