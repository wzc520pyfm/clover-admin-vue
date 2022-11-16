import type { RouteRecordRaw } from "vue-router";

const modules = import.meta.glob("./**/*.ts", { eager: true }) as Record<
  string,
  { default: RouteRecordRaw }
>;

const routes: RouteRecordRaw[] = [];
console.log('modules', modules)
Object.keys(modules).forEach((key) => {
  const route = modules[key].default;
  routes.push(route);
});

export { routes };
