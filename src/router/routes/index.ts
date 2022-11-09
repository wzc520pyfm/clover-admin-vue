
/** 跟路由 */
export const ROOT_ROUTE = {
  name: "root",
  path: "/",
  redirect: "/home",
};

/** 固定路由 */
export const constantRoutes = [
  ROOT_ROUTE,
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
];
