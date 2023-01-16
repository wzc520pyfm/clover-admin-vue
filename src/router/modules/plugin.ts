import Layout from "@/layout";

const plugin = [
  {
    name: "plugin",
    path: "/plugin",
    component: Layout,
    redirect: "/plugin/about",
    meta: { title: "插件", order: 2, icon: "MagicStick" },
    children: [
      {
        path: "about",
        name: "plugin_about",
        component: () => import("@/views/plugin/oss/index.vue"),
        meta: { title: "OSS", icon: "Files" },
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
