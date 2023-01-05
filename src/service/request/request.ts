import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import CustomAxiosInstance from "./instance";

type RequestMethod = "get" | "post" | "put" | "delete" | "patch";

type ResponseEntries = keyof AxiosResponse;

type MyAxiosRequestConfig = AxiosRequestConfig & {
  defaultMethod?: RequestMethod;
};

type MyRequestConfig = {
  axios?: AxiosRequestConfig;
  entries?: ResponseEntries[];
};

interface RequestParam {
  url: string;
  method?: RequestMethod;
  data?: any;
  axiosConfig?: AxiosRequestConfig;
  entries?: ResponseEntries[];
}

export function createRequest(
  axiosConfig: MyAxiosRequestConfig,
  backendConfig?: Service.BackendResultConfig
) {
  const { defaultMethod = "get" } = axiosConfig;
  const customInstance = new CustomAxiosInstance(axiosConfig, backendConfig);

  /**
   * 异步promise请求
   * @param param - 请求参数
   *  - url: 请求地址
   *  - method: 请求方法(默认get)
   *  - data: 请求的body的data
   *  - axiosConfig: axios配置
   */
  async function asyncRequest<T>(param: RequestParam): Promise<Service.RequestResult<T>> {
    const { url, data, axiosConfig, entries } = param;
    const method = param.method ?? defaultMethod;
    const instance = customInstance.getInstance();

    const res = (await getRequestResponse({
      instance,
      method,
      url,
      data,
      config: axiosConfig,
      entries,
    })) as Service.RequestResult<T>;

    return res;
  }

  /**
   * get请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function get<T>(url: string, config?: MyRequestConfig) {
    return asyncRequest<T>({
      url,
      method: "get",
      axiosConfig: config?.axios,
      entries: config?.entries,
    });
  }

  /**
   * post请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function post<T>(url: string, data?: any, config?: MyRequestConfig) {
    return asyncRequest<T>({
      url,
      method: "post",
      data,
      axiosConfig: config?.axios,
      entries: config?.entries,
    });
  }

  /**
   * put请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function put<T>(url: string, data?: any, config?: MyRequestConfig) {
    return asyncRequest<T>({
      url,
      method: "put",
      data,
      axiosConfig: config?.axios,
      entries: config?.entries,
    });
  }

  /**
   * patch请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function patch<T>(url: string, data?: any, config?: MyRequestConfig) {
    return asyncRequest<T>({
      url,
      method: "patch",
      data,
      axiosConfig: config?.axios,
      entries: config?.entries,
    });
  }

  /**
   * delete请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function handleDelete<T>(url: string, config?: MyRequestConfig) {
    return asyncRequest<T>({
      url,
      method: "delete",
      axiosConfig: config?.axios,
      entries: config?.entries,
    });
  }

  return {
    get,
    post,
    put,
    patch,
    delete: handleDelete,
  };
}

async function getRequestResponse(params: {
  instance: AxiosInstance;
  method: RequestMethod;
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
  entries?: ResponseEntries[];
}) {
  const { instance, method, url, data, config, entries = ["data"] } = params;

  let res: any;
  if (["get", "delete"].includes(method)) {
    // 无需携带请求负载的请求
    res = await instance[method](url, config);
  } else {
    res = await instance[method](url, data, config);
  }
  // res即axios的响应结构, see: https://axios-http.com/zh/docs/res_schema
  // 通过指定entries来决定获取哪些, 通常保持默认获取data即可
  let result = {};
  if (entries.length === 1) result = res[entries[0]];
  else {
    entries.forEach(async (item) => {
      Object.assign(result, { [item]: item === "data" ? (await res[item]).data : res[item] });
    });
  }

  return result;
}
