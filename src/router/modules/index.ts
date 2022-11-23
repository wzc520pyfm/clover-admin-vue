import type { AuthRoute } from "@/typings/route";

const modules = import.meta.glob("./**/*.ts", { eager: true }) as Record<
  string,
  { default: AuthRoute.Route }
>;

const routes: AuthRoute.Route[] = [];
Object.keys(modules).forEach((key) => {
  const route = modules[key].default;
  routes.push(route);
});

export { routes };
