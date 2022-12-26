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
    server: {
      port: 5574,
      proxy: createViteProxy(isOpenProxy, envConfig),
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
