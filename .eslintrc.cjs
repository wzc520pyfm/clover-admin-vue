/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    es6: true, // 允许es6
    browser: true, // 浏览器全局变量
    node: true, // node全局变量和其作用域
  },
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
  // 插件
  plugins: ["@typescript-eslint", "prettier", "unicorn"],
  // 预设的lint包
  extends: [
    "plugin:vue/vue3-recommended", // 为vue3在防止错误的基础上强制执行主观社区默认值以确保一致性的规则（源自eslint-plugin-vue捆绑包）, see: https://eslint.vuejs.org/user-guide/
    "eslint:recommended", // 核心规则: see: http://eslint.cn/docs/rules/
    "plugin:import/recommended", // es6导入导出规则集
    "plugin:eslint-comments/recommended", // 注释规则集
    "plugin:jsonc/recommended-with-jsonc", // 正确的json规则集
    "plugin:markdown/recommended", // 为markdown中的代码块提供检查规则
    "plugin:@typescript-eslint/recommended", // 使 ESLint 和 Prettier 能够支持 TypeScript 的工具
    "@vue/eslint-config-typescript", // 专门用于setup的规则集
    "@vue/eslint-config-prettier", // 专门用于setup的规则集
    "./.eslintrc-auto-import.json", // auto-import插件的eslint声明文件
    "prettier",
  ],
  settings: {
    "import/resolver": {
      node: { extensions: [".js", ".mjs", ".ts", ".d.ts", ".tsx"] },
    },
  },
  // 覆盖配置
  overrides: [
    {
      files: ["*.json", "*.json5", "*.jsonc"],
      parser: "jsonc-eslint-parser",
    },
    {
      files: ["*.ts", "*.vue"],
      rules: {
        "no-undef": "off",
      },
    },
    {
      files: ["**/__tests__/**"],
      rules: {
        "no-console": "off",
        "vue/one-component-per-file": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "import/no-duplicates": "off",
      },
    },
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "no-undef": "off",
      },
    },
    {
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"], // 范围
      extends: ["plugin:cypress/recommended"], // 预设的lint包
    },
    {
      files: ["**/*.md/*.js", "**/*.md/*.ts"],
      rules: {
        "no-console": "off",
        "import/no-unresolved": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
  // 解析器选项
  parserOptions: {
    ecmaVersion: "latest", // ECMAScript版本
  },
  rules: {
    // js/ts
    camelcase: ["error", { properties: "never" }],
    // "no-console": ["warn", { allow: ["error"] }],
    "no-debugger": "warn",
    "no-constant-condition": ["error", { checkLoops: false }],
    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    "no-return-await": "error",
    "no-var": "error",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-empty-function": "off",
    "prefer-const": ["warn", { destructuring: "all", ignoreReadBeforeAssign: true }],
    "prefer-arrow-callback": ["error", { allowNamedFunctions: false, allowUnboundThis: true }],
    "object-shorthand": ["error", "always", { ignoreConstructors: false, avoidQuotes: true }],
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",

    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "error",

    // best-practice
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "no-alert": "warn",
    "no-case-declarations": "error",
    "no-multi-str": "error",
    "no-with": "error",
    "no-void": "error",

    "sort-imports": [
      "warn",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ],

    // stylistic-issues
    "prefer-exponentiation-operator": "error",

    // ts
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/consistent-type-imports": ["error", { disallowTypeAnnotations: false }],
    "@typescript-eslint/ban-ts-comment": ["off", { "ts-ignore": false }],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",

    // vue
    // 'vue/no-v-html': 'off',
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
    "vue/prefer-import-from-vue": "off",
    "vue/no-v-text-v-html-on-component": "off",
    /** why off? see: https://github.com/vuejs/eslint-plugin-vue/issues/1793 */
    "vue/no-setup-props-destructure": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],

    // prettier
    "prettier/prettier": "error",

    // import
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/no-unresolved": "off",
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/named": "off",

    // eslint-plugin-eslint-comments
    "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],

    // unicorn
    "unicorn/custom-error-definition": "error",
    "unicorn/error-message": "error",
    "unicorn/escape-case": "error",
    "unicorn/import-index": "error",
    "unicorn/new-for-builtins": "error",
    "unicorn/no-array-method-this-argument": "error",
    "unicorn/no-array-push-push": "error",
    "unicorn/no-console-spaces": "error",
    "unicorn/no-for-loop": "error",
    "unicorn/no-hex-escape": "error",
    "unicorn/no-instanceof-array": "error",
    "unicorn/no-invalid-remove-event-listener": "error",
    "unicorn/no-new-array": "error",
    "unicorn/no-new-buffer": "error",
    "unicorn/no-unsafe-regex": "off",
    "unicorn/number-literal-case": "error",
    "unicorn/prefer-array-find": "error",
    "unicorn/prefer-array-flat-map": "error",
    "unicorn/prefer-array-index-of": "error",
    "unicorn/prefer-array-some": "error",
    "unicorn/prefer-date-now": "error",
    "unicorn/prefer-dom-node-dataset": "error",
    "unicorn/prefer-includes": "error",
    "unicorn/prefer-keyboard-event-key": "error",
    "unicorn/prefer-math-trunc": "error",
    "unicorn/prefer-modern-dom-apis": "error",
    "unicorn/prefer-negative-index": "error",
    "unicorn/prefer-number-properties": "error",
    "unicorn/prefer-optional-catch-binding": "error",
    "unicorn/prefer-prototype-methods": "error",
    "unicorn/prefer-query-selector": "error",
    "unicorn/prefer-reflect-apply": "error",
    "unicorn/prefer-string-slice": "error",
    "unicorn/prefer-string-starts-ends-with": "error",
    "unicorn/prefer-string-trim-start-end": "error",
    "unicorn/prefer-type-error": "error",
    "unicorn/throw-new-error": "error",
  },
};
