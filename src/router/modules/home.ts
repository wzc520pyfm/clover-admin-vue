import Layout from "@/layout/index.vue";

const home = [
  {
    name: "home",
    path: "/home",
    component: Layout,
    redirect: "/home/index",
    children: [
      {
        path: "index",
        name: "home_index",
        component: () => import("@/views/HomeView.vue"),
      },
    ],
  },
];

export default home;
