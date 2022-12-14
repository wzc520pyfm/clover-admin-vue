import Layout from "@/layout/index.vue";

const authDemo = [
  {
    name: "auth-demo",
    path: "/auth-demo",
    component: Layout,
    redirect: "/auth-demo/user",
    meta: { title: "权限示例", order: 4, icon: "Aim" },
    children: [
      {
        path: "user",
        name: "auth-demo-user",
        component: () => import("@/views/auth-demo/user/index.vue"),
        meta: { title: "普通用户可见", icon: "User" },
      },
      {
        path: "super",
        name: "auth-demo-super",
        component: () => import("@/views/auth-demo/super/index.vue"),
        meta: { title: "超级管理员可见", icon: "Avatar", permissions: ["super"] },
      },
    ],
  },
];

export default authDemo;
