import type { AuthRoute } from "@/typings/route";
import { handleModuleRoutes } from "../helper";

const modules = import.meta.glob("./**/*.ts", { eager: true }) as Record<
  string,
  { default: AuthRoute.Route }
>;

const routes = handleModuleRoutes(modules);

export { routes };
