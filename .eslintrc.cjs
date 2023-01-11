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
    Expose: "readonly",
    ApiUserManagement: "readonly",
  },
  // 预设的lint包
  extends: [
    "plugin:vue/vue3-recommended", // 在防止错误的基础上强制执行主观社区默认值以确保一致性的规则（源自eslint-plugin-vue捆绑包）, see: https://eslint.vuejs.org/user-guide/
    "eslint:recommended", // 核心规则: see: http://eslint.cn/docs/rules/
    "plugin:eslint-comments/recommended", // 注释规则集
    "@vue/eslint-config-typescript", // 专门用于setup的规则集
    "@vue/eslint-config-prettier", // 专门用于setup的规则集
    "./.eslintrc-auto-import.json", // auto-import插件的eslint声明文件
  ],
  // 覆盖配置
  overrides: [
    {
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"], // 范围
      extends: ["plugin:cypress/recommended"], // 预设的lint包
    },
  ],
  // 解析器选项
  parserOptions: {
    ecmaVersion: "latest", // ECMAScript版本
  },
  rules: {
    // eslint-plugin-eslint-comments
    "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
    /** why off? see: https://github.com/vuejs/eslint-plugin-vue/issues/1793 */
    "vue/no-setup-props-destructure": "off",
    "vue/multi-word-component-names": "off",
  },
};
