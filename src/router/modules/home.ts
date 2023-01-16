import Layout from "@/layout";

const home = [
  {
    name: "home",
    path: "/home",
    component: Layout,
    redirect: "/home/index",
    meta: { title: "首页", hidden: true, order: 1 },
    children: [
      {
        path: "index",
        name: "home_index",
        component: () => import("@/views/HomeView.vue"),
        meta: {
          title: "首页",
          key: "root",
          icon: "House",
        },
      },
    ],
  },
];

export default home;
