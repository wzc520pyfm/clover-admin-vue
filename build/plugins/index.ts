import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import unocss from "unocss/vite";
import unplugin from "./unplugin";
import mock from "./mock";

/**
 * vite插件
 */
export function setupVitePlugins(): (PluginOption | PluginOption[])[] {
  const plugins = [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    ...unplugin(),
    unocss(),
    mock,
  ];

  return plugins;
}
