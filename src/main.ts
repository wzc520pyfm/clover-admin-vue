import { createApp } from "vue";

import App from "./App.vue";
import { setupRouter } from "./router";
import { setupAssets } from "./plugins";
import { setupStore } from "./stores";

async function setupApp() {
  // import assets: js, css, images, fonts, etc.
  setupAssets();

  const app = createApp(App);

  // setup vue store plugin: pinia.
  setupStore(app);

  // vue router
  await setupRouter(app);

  // mount app
  app.mount("#app");
}

setupApp();
