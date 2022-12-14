import Layout from "@/layout/index.vue";

const about = [
  {
    name: "about",
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    meta: { title: "关于", hidden: true, order: 5 },
    children: [
      {
        path: "index",
        name: "about_index",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于",
          icon: "Warning",
        },
      },
    ],
  },
];

export default about;
