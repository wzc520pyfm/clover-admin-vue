import { mockRequest } from "../request";

/**
 *  帐密登录
 * @param username - 用户名
 * @param password - 密码
 * @returns Token
 */
export function fetchLogin(username: string, password: string) {
  return mockRequest.post<ApiAuth.Token>("/login", { username, password });
}
// mockRequest.post<ApiAuth.Token>("/login", { username, password }, {});
// mockRequest.get<ApiAuth.Token>("/login", { params: {} });