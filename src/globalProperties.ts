import type { App } from "vue";
import { isArray } from "./utils";
import * as filters from "./utils/filters";

/** setup custom vue globalProperties */
/**
 * how to define type?
 *  - please go to /src/typing/vue.d.ts
 * how to use in setup?
 *  - const vm = getCurrentInstance()!;
 *  - const { $filters } = vm.appContext.config.globalProperties;
 * how to use in template?
 *  - <p>{{ $filters }}</p>
 */
export function setupGlobalProperties(app: App) {
  installGlobalProperties(filters, "$filters");

  function installGlobalProperties<T>(fn: T, name: string) {
    if (isArray(fn)) {
      app.config.globalProperties[name] = { ...fn };
    } else {
      app.config.globalProperties[name] = fn;
    }

    return fn;
  }
}
