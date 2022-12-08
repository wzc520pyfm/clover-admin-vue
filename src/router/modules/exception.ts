import Layout from "@/layout/index.vue";

const exception = [
  {
    name: "exception",
    path: "/exception",
    component: Layout,
    redirect: "/exception/403",
    meta: { title: "异常页", order: 3, icon: "Failed" },
    children: [
      {
        path: "403",
        name: "exception_403",
        component: () => import("@/views/exception/403/index.vue"),
        meta: { title: "403", icon: "Lock" },
      },
      {
        path: "404",
        name: "exception_404",
        component: () => import("@/views/exception/404/index.vue"),
        meta: { title: "404", icon: "Hide" },
      },
      {
        path: "500",
        name: "exception_500",
        component: () => import("@/views/exception/500/index.vue"),
        meta: { title: "500", icon: "CircleCloseFilled" },
      },
    ],
  },
];

export default exception;
