import { Blank, Layout } from "@/layout";

const plugin = [
  {
    name: "plugin",
    path: "/plugin",
    component: Layout,
    redirect: "/plugin/icon",
    meta: { title: "插件", order: 2, icon: "ep-magic-stick" },
    children: [
      {
        path: "icon",
        name: "plugin_icon",
        component: () => import("@/views/plugin/icon/index.vue"),
        meta: { title: "图标", icon: "ep-star" },
      },
      {
        path: "echarts",
        name: "plugin_echarts",
        component: () => import("@/views/plugin/echarts/index.vue"),
        meta: { title: "图表", icon: "ep-pie-chart" },
      },
      {
        path: "about",
        name: "plugin_about",
        component: () => import("@/views/plugin/oss/index.vue"),
        meta: { title: "OSS(无后端不可用)", icon: "ep-files" },
      },
      {
        path: "map",
        name: "plugin_map",
        component: () => import("@/views/plugin/map/index.vue"),
        meta: { title: "地图", icon: "ep-location" },
      },
      {
        path: "swiper",
        name: "plugin_swiper",
        component: () => import("@/views/plugin/swiper/index.vue"),
        meta: { title: "Swiper", icon: "ep-film" },
      },
      {
        path: "editor",
        name: "plugin_editor",
        component: Blank,
        meta: { title: "编辑器", icon: "mdi-circle-edit-outline" },
        children: [
          {
            path: "markdown",
            name: "plugin_editor_markdown",
            component: () => import("@/views/plugin/editor/markdown/index.vue"),
            meta: { title: "Markdown", icon: "mdi-language-markdown-outline" },
          },
        ],
      },
    ],
  },
];

export default plugin;
