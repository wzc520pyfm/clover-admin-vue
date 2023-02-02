import type { App } from "vue";
import setupPermissionDirective from "./permission";
import setupClipboardDirective from "./clipboard";

/** setup custom vue directives. */
export function setupDirectives(app: App) {
  setupPermissionDirective(app);
  setupClipboardDirective(app);
}
