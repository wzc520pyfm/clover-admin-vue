import Layout from "@/layout/index.vue";

const component = [
  {
    name: "component",
    path: "/component",
    component: Layout,
    redirect: "/component/table",
    meta: { title: "组件示例", order: 5, icon: "Menu" },
    children: [
      {
        path: "table",
        name: "component_table",
        component: () => import("@/views/component/table/index.vue"),
        meta: {
          title: "表格",
          icon: "Grid",
        },
      },
    ],
  },
];

export default component;
