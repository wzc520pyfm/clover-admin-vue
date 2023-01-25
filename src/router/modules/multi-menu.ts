import { Blank, Layout } from "@/layout";

const multiMenu: AuthRoute.Route[] = [
  {
    name: "multi-menu",
    path: "/multi-menu",
    component: Layout,
    redirect: "/multi-menu/first",
    meta: { title: "多级菜单", icon: "ep-reading", order: 7 },
    children: [
      {
        path: "first",
        name: "multi-menu_first",
        component: Blank,
        redirect: "/multi-menu/first/second",
        meta: { title: "一级菜单", icon: "ep-reading" },
        children: [
          {
            path: "second",
            name: "multi-menu_first_second",
            component: () => import("@/views/multi-menu/first/second/index.vue"),
            meta: {
              title: "二级菜单",
              icon: "ep-reading",
            },
          },
          {
            path: "second-new",
            name: "multi-menu_first_second-new",
            component: Blank,
            redirect: "/multi-menu/first/second-new/third",
            meta: {
              title: "二级菜单(有子菜单)",
              icon: "ep-reading",
            },
            children: [
              {
                path: "third",
                name: "multi-menu_first_second-new_third",
                component: () => import("@/views/multi-menu/first/second-new/third/index.vue"),
                meta: {
                  title: "三级菜单",
                  icon: "ep-reading",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export default multiMenu;
