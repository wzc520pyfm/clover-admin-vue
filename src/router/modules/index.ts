import { handleModuleRoutes } from "../helper";

// see: https://cn.vitejs.dev/guide/features.html#glob-import
const modules = import.meta.glob("./**/*.ts", { eager: true }) as Record<
  string,
  { default: AuthRoute.Route }
>;

const routes = handleModuleRoutes(modules);

export { routes };
