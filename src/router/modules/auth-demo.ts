import Layout from "@/layout";

const authDemo = [
  {
    name: "auth-demo",
    path: "/auth-demo",
    component: Layout,
    redirect: "/auth-demo/user",
    meta: { title: "权限示例", order: 4, icon: "ep-aim" },
    children: [
      {
        path: "user",
        name: "auth-demo-user",
        component: () => import("@/views/auth-demo/user/index.vue"),
        meta: { title: "普通用户可见", icon: "ep-user" },
      },
      {
        path: "super",
        name: "auth-demo-super",
        component: () => import("@/views/auth-demo/super/index.vue"),
        meta: { title: "超级管理员可见", icon: "ep-avatar", permissions: ["super"] },
      },
      {
        path: "permission",
        name: "auth-demo-permission",
        component: () => import("@/views/auth-demo/permission/index.vue"),
        meta: { title: "权限指令", icon: "ep-lock" },
      },
    ],
  },
];

export default authDemo;
