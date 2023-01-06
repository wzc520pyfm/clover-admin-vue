import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { VitePWA } from "vite-plugin-pwa";
import unocss from "unocss/vite";
import unplugin from "./unplugin";
import mock from "./mock";
import html from "./html";
import compress from "./compress";
import visualizer from "./visualizer";

/**
 * vite插件
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins = [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    VitePWA(), // see: https://github.com/vite-pwa/vite-plugin-pwa
    html(viteEnv),
    ...unplugin(),
    unocss(),
    mock,
  ];

  if (viteEnv.VITE_VISUALIZER === "Y") {
    plugins.push(visualizer());
  }

  if (viteEnv.VITE_COMPRESS === "Y") {
    plugins.push(compress(viteEnv));
  }

  return plugins;
}
