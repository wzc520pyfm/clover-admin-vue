import Layout from "@/layout/index.vue";

const functionRoute = [
  {
    name: "function",
    path: "/function",
    component: Layout,
    redirect: "/function/request",
    meta: { title: "功能示例", order: 6, icon: "StarFilled" },
    children: [
      {
        path: "request",
        name: "function_request",
        component: () => import("@/views/function/request/index.vue"),
        meta: {
          title: "网络请求",
          icon: "Promotion",
        },
      },
    ],
  },
];

export default functionRoute;