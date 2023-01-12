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
      {
        path: "permission",
        name: "auth-demo-permission",
        component: () => import("@/views/auth-demo/permission/index.vue"),
        meta: { title: "权限指令", icon: "Lock" },
      },
    ],
  },
];

export default authDemo;
