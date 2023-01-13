import type { MockMethod } from "vite-plugin-mock";

/** 参数错误的状态码 */
const ERROR_PARAM_CODE = 10000;

const ERROR_PARAM_MSG = "参数校验失败！";

const apis: MockMethod[] = [
  // 用户帐密登录
  {
    url: "/mock/login",
    method: "post",
    statusCode: 200,
    response: () => {
      return {
        code: 200,
        message: "成功",
        data: {
          token: "这是Token",
        },
      };
    },
  },
];

export default apis;
