/** 跟路由 */
export const ROOT_ROUTE = {
  name: "root",
  path: "/",
  redirect: "/home/index",
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
  // 匹配无效路径的路由
  {
    name: "not-found-page",
    path: "/:pathMatch(.*)*",
    component: "blank",
    meta: {
      title: "未找到",
      singleLayout: "blank",
    },
  },
];
