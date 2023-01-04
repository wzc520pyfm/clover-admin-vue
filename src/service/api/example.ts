import { mockRequest } from "../request";

export function fetch404() {
  return mockRequest.get<ApiAuth.Token>("/404");
}
