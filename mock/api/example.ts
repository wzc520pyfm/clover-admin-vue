import type { MockMethod } from "vite-plugin-mock";

/** 参数错误的状态码 */
const ERROR_PARAM_CODE = 10000;

const ERROR_PARAM_MSG = "参数校验失败！";

const apis: MockMethod[] = [
  // 获取data
  {
    url: "/mock/example-data",
    method: "get",
    statusCode: 200,
    response: (_) => {
      return {
        code: 200,
        message: "成功",
        data: {
          list: [{ name: "jack" }],
        },
      };
    },
  },
  // 响应数据不包含data
  {
    url: "/mock/example-no-data",
    method: "get",
    statusCode: 200,
    response: (_) => {
      return {
        code: 200,
        message: "成功",
      };
    },
  },
  // 获取headers
  {
    url: "/mock/example-headers",
    method: "get",
    statusCode: 200,
    response: (_) => {
      return {
        code: 200,
        message: "成功",
        data: {},
      };
    },
  },
];

export default apis;
