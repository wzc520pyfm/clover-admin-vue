import Layout from "@/layout/index.vue";

const plugin = [
  {
    name: "plugin",
    path: "/plugin",
    component: Layout,
    redirect: "/plugin/about",
    meta: { title: "插件" },
    children: [
      {
        path: "about",
        name: "plugin_about",
        component: () => import("@/views/AboutView.vue"),
        meta: { title: "OSS" },
      },
      {
        path: "map",
        name: "plugin_map",
        component: () => import("@/views/plugin/map/index.vue"),
        meta: { title: "地图" },
      },
    ],
  },
];

export default plugin;
