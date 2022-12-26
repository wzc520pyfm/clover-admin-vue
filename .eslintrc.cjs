/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  globals: {
    /** when you use globals by ts, you need specifying globals for eslint!  */
    AMap: "readonly",
    defineOptions: "readonly",
    GlobalMenuOption: "readonly",
    GlobalTabRoute: "readonly",
    AuthRoute: "readonly",
    Auth: "readonly",
    ServiceEnvType: "readonly",
    ServiceEnvConfig: "readonly",
    ServiceEnvConfigs: "readonly",
    ImportMetaEnv: "readonly",
    ImportMeta: "readonly",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "./.eslintrc-auto-import.json",
  ],
  overrides: [
    {
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    /** why off? see: https://github.com/vuejs/eslint-plugin-vue/issues/1793 */
    "vue/no-setup-props-destructure": "off",
  },
};
