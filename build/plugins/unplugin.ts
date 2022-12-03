import type { PluginOption } from "vite";
import VueMacros from "unplugin-vue-macros/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";

export default function unplugin(): PluginOption[] {
  return [
    VueMacros(),
    AutoImport({
      imports: ["vue", "vue/macros", "vue-router", "pinia"], // 自动导入vue和vue-router相关函数
      dts: "src/typings/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
      resolvers: [
        ElementPlusResolver(), // 自动导入element-plus相关组件
        IconsResolver({
          // 自动导入图标组件
          prefix: "Icon",
        }),
      ],
      eslintrc: {
        enabled: false, // 自动生成全局声明文件, 不需要eslint检查(在.eslintrc-auto-import.json生成成功之后就可以改为false, 当你更新了导入配置后,将其改为true即可重新生成一次)
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    Components({
      dts: "src/typings/components.d.ts",
      resolvers: [
        IconsResolver({
          // 自动注册图标组件
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver(), // 自动导入element-plus相关组件
      ],
    }),

    Icons({
      // 自动导入图标组件
      autoInstall: true,
    }),
    ElementPlus(), // 当需要手动导入Element组件时, 此plugin可帮助你自动导入其样式
  ];
}
