import Layout from "@/layout";

const plugin = [
  {
    name: "plugin",
    path: "/plugin",
    component: Layout,
    redirect: "/plugin/icon",
    meta: { title: "插件", order: 2, icon: "MagicStick" },
    children: [
      {
        path: "icon",
        name: "plugin_icon",
        component: () => import("@/views/plugin/icon/index.vue"),
        meta: { title: "图标", icon: "Star" },
      },
      {
        path: "echarts",
        name: "plugin_echarts",
        component: () => import("@/views/plugin/echarts/index.vue"),
        meta: { title: "图表", icon: "PieChart" },
      },
      {
        path: "about",
        name: "plugin_about",
        component: () => import("@/views/plugin/oss/index.vue"),
        meta: { title: "OSS(无后端不可用)", icon: "Files" },
      },
      {
        path: "map",
        name: "plugin_map",
        component: () => import("@/views/plugin/map/index.vue"),
        meta: { title: "地图", icon: "Location" },
      },
      {
        path: "swiper",
        name: "plugin_swiper",
        component: () => import("@/views/plugin/swiper/index.vue"),
        meta: { title: "Swiper", icon: "Film" },
      },
    ],
  },
];

export default plugin;
