import path from "path";

/**
 * 获取项目根路径
 * @description 末尾无斜杠
 */
export function getRootPath() {
  return path.resolve(process.cwd());
}

/**
 * 获取项目src路径
 * @parma srcName - src目录名称
 * @description 末尾无斜杠
 */
export function getSrcPath(srcName = "src") {
  const rootPath = getRootPath();
  return `${rootPath}/${srcName}`;
}
