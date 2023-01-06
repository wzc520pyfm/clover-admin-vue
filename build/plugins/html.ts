import type { PluginOption } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

// see: https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
export default (viteEnv: ImportMetaEnv): PluginOption[] => {
  return createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        appName: viteEnv.VITE_APP_NAME,
        appTitle: viteEnv.VITE_APP_TITLE,
        appDescription: viteEnv.VITE_APP_DESC,
      },
    },
  });
};
