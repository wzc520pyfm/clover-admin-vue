import { mockRequest } from "../request";

export function fetch404() {
  return mockRequest.post("/404");
}

export function fetchExampleData() {
  return mockRequest.get("/example-data");
}

export function fetchExampleNoData() {
  return mockRequest.get("/example-no-data");
}

export function fetchExampleHeaders() {
  return mockRequest.get("/example-headers", { entries: ["data", "headers"] });
}
