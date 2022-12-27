import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { createViteProxy, setupVitePlugins } from "./build";
import { getServiceEnvConfig } from "./.env.config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());

  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === "Y";
  const envConfig = getServiceEnvConfig(viteEnv);

  return {
    base: "/",
    plugins: setupVitePlugins(),
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
    // 依赖优化选项
    optimizeDeps: {
      include: [], // 需要强制预构建的包
    },
    // 构建选项
    build: {
      sourcemap: false, // 构建后是否生成source map 文件
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告, 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
    },
  };
});
