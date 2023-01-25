import Layout from "@/layout";

const dashboard = [
  {
    name: "dashboard",
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard/analysis",
    meta: { title: "仪表盘", order: 1, icon: "ep-house" },
    children: [
      {
        path: "analysis",
        name: "dashboard_analysis",
        component: () => import("@/views/dashboard/analysis/index.vue"),
        meta: {
          title: "分析页",
          key: "root",
          icon: "ep-house",
        },
      },
    ],
  },
];

export default dashboard;
