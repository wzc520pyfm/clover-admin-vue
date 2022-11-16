import Layout from "@/layout/index.vue";

const plugin = [
  {
    name: "plugin",
    path: "/plugin",
    component: Layout,
    children: [
      {
        path: "about",
        name: "plugin_about",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/AboutView.vue"),
      },
      {
        path: "map",
        name: "plugin_map",
        component: () => import("@/views/plugin/map/index.vue"),
      },
    ],
  },
];

export default plugin;
