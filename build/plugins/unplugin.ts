import type { PluginOption } from "vite";
import VueMacros from "unplugin-vue-macros/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import ElementPlus from "unplugin-element-plus/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { getSrcPath } from "../utils";

export default function unplugin(): PluginOption[] {
  const srcPath = getSrcPath();
  const localIconPath = `${srcPath}/assets/svg-icon`;

  /** 本地svg图标集合名称 */
  const collectionName = "local";

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
          // 自动注册图标组件 how to use: <i-ep-location />
          enabledCollections: ["ep", "mdi"], // 'ep'是element图标集在https://iconify.design/ 里的集合名, 如果你引入或`使用了其他图标集, 需要在此把其集合名写上
          // 本地svg图标集合
          customCollections: [collectionName],
          // componentPrefix: "icon", // 与element-plus的prefix配置冲突(本地图标使用: <i-local-iconName />)
        }),
        ElementPlusResolver(), // 自动导入element-plus相关组件
      ],
    }),

    // see: https://github.com/antfu/unplugin-icons
    Icons({
      // 自动导入图标组件 图标来源: https://iconify.design/
      autoInstall: true,
      // 本地图标
      compiler: "vue3",
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath),
      },
      scale: 1,
      defaultClass: "inline-block",
    }),
    // 封装本地svg图标
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `icon-local-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__",
    }),
    ElementPlus(), // 当需要手动导入Element组件时, 此plugin可帮助你自动导入其样式
  ];
}
