/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  globals: {
    AMap: "readonly",
    defineOptions: "readonly",
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
};
