import Layout from "@/layout/index.vue";

const dashboard = [
  {
    name: "dashboard",
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard/analysis",
    meta: { title: "仪表盘", order: 1, icon: "House" },
    children: [
      {
        path: "analysis",
        name: "dashboard_analysis",
        component: () => import("@/views/dashboard/analysis/index.vue"),
        meta: {
          title: "分析页",
          key: "root",
          icon: "House",
        },
      },
    ],
  },
];

export default dashboard;
