import { createApp } from "vue";

import App from "./App.vue";
import { setupDirectives } from "./directives";
import { setupRouter } from "./router";
import { setupAssets } from "./plugins";
import { setupStore } from "./stores";
import { setupGlobalProperties } from "./globalProperties";

async function setupApp() {
  // import assets: js, css, images, fonts, etc.
  setupAssets();

  const app = createApp(App);

  // setup vue store plugin: pinia.
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue custom globalProperties
  setupGlobalProperties(app);

  // vue router
  await setupRouter(app);

  // mount app
  app.mount("#app");
}

setupApp();
