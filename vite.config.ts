import { URL, fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { createViteProxy, setupVitePlugins } from "./build";
import { getServiceEnvConfig } from "./.env-config";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv;

  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === "Y";
  const envConfig = getServiceEnvConfig(viteEnv);

  return {
    base: viteEnv.VITE_BASE_URL,
    plugins: setupVitePlugins(viteEnv),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 5574,
      open: true,
      proxy: createViteProxy(isOpenProxy, envConfig),
    },
    // css配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/main.scss" as *;`,
        },
        less: {
          // see: https://lesscss.org/usage/#less-options
          modifyVars: {
            // 全局导入
            // reference: 避免重复引用
            hack: `true; @import (reference) "${resolve("src/styles/less/main.less")}";`,
          },
        },
      },
    },
    // 依赖优化选项
    optimizeDeps: {
      include: ["swiper", "swiper/vue", "@better-scroll/core", "echarts"], // 需要强制预构建的包
    },
    // 构建选项
    build: {
      sourcemap: false, // 构建后是否生成source map 文件
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告, 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
    },
  };
});
