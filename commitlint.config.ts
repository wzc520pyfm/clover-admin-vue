import { execSync } from "child_process";
import fg from "fast-glob";

const getPackages = (packagePath) => fg.sync("*", { cwd: packagePath, onlyDirectories: true });

const scopes = [
  ...getPackages("src"),
  "doc", // 文档
  "project", // 项目
  "core", // 核心
  "ci", // 构建
  "dev", // 开发相关
  "vscode", // vscode相关
  "mock", // mock相关
  "public", // 公共资源相关
  "other", // 其他
];

const gitStatus = execSync("git status --porcelain || true").toString().trim().split("\n");

const scopeComplete = gitStatus
  .find((r) => ~r.indexOf("M  packages"))
  ?.replace(/\//g, "%%")
  ?.match(/packages%%((\w|-)*)/)?.[1];

const subjectComplete = gitStatus
  .find((r) => ~r.indexOf("M  packages/components"))
  ?.replace(/\//g, "%%")
  ?.match(/packages%%components%%((\w|-)*)/)?.[1];

export default {
  rules: {
    /**
     * type[scope]: [function] description
     *      ^^^^^
     */
    "scope-enum": [2, "always", scopes],
    /**
     * type[scope]: [function] description
     *
     * ^^^^^^^^^^^^^^ empty line.
     * - Something here
     */
    "body-leading-blank": [1, "always"],
    /**
     * type[scope]: [function] description
     *
     * - something here
     *
     * ^^^^^^^^^^^^^^
     */
    "footer-leading-blank": [1, "always"],
    /**
     * type[scope]: [function] description [No more than 72 characters]
     *      ^^^^^
     */
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [1, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    /**
     * type[scope]: [function] description
     * ^^^^
     */
    "type-enum": [
      2,
      "always",
      [
        "build", // 构建流程、外部依赖变更(如升级npm包、修改打包配置等)
        "chore", // 对构建过程或辅助工具和库的更改(不应影响源文件、测试用例)
        "ci", // 修改CI配置、脚本
        "docs", // 文档变更
        "feat", // 新增功能
        "fix", // 修复缺陷(bug)
        "perf", // 性能优化
        "refactor", // 代码重构
        "revert", // 回滚commit
        "release", // 发版
        "style", // 代码个数
        "test", // 添加测试或已有测试改动
        "types", // 类型定义文件修改
        "improvement", // 改进
      ],
    ],
  },
  prompt: {
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? "top" : "bottom",
    defaultSubject: subjectComplete && `[${subjectComplete}] `,
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
  },
};
