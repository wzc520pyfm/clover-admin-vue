/* eslint-disable prettier/prettier */
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

// @tip: git branch name = feature/issue_33   =>    auto get defaultIssues = #33
const issue = execSync("git rev-parse --abbrev-ref HEAD").toString().trim().split("_")[1];

// @see: https://cz-git.qbb.sh/zh/config/
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
        "chore", // 其他修改, 对构建过程或辅助工具和库的更改(不应影响源文件、测试用例)
        "ci", // 修改CI配置、脚本
        "docs", // 文档变更
        "feat", // 新增功能
        "fix", // 修复缺陷(bug)
        "perf", // 性能优化
        "refactor", // 代码重构
        "revert", // 回滚commit
        "release", // 发版
        "style", // 代码格式
        "test", // 添加测试或已有测试改动
      ],
    ],
  },
  prompt: {
    customIssuePrefixAlign: !issue ? "top" : "bottom",
    defaultIssues: !issue ? "" : `#${issue}`,
    types: [
      { value: "feat", name: "feat:     ✨  A new feature", emoji: ":sparkles:" },
      { value: "fix", name: "fix:      🐛  A bug fix", emoji: ":bug:" },
      { value: "docs", name: "docs:     📝  Documentation only changes", emoji: ":memo:" },
      { value: "style", name: "style:    🎨  Changes that do not affect the meaning of the code", emoji: ":art:" },
      { value: "refactor", name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
      { value: "perf", name: "perf:     ⚡️  A code change that improves performance", emoji: ":zap:" },
      { value: "test", name: "test:     ✅  Adding missing tests or correcting existing tests", emoji: ":white_check_mark:" },
      { value: "build", name: "build:    📦️   Changes that affect the build system or external dependencies", emoji: ":package:" },
      { value: "ci", name: "ci:       👷  Changes to our CI configuration files and scripts", emoji: ":construction_worker:" },
      { value: "chore", name: "chore:    🔨  Other changes that don't modify src or test files", emoji: ":hammer:" },
      { value: "revert", name: "revert:   ⏪️  Reverts a previous commit", emoji: ":rewind:" },
      { value: "release", name: "release:  🔖  Release a version", emoji: ":bookmark:" },
    ],
    useEmoji: true, // 出于美观, 项目使用了emoji, 但emoji应遵循规范  @see: https://gitmoji.dev/
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
  },
};
