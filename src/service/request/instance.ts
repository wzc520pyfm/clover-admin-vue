import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosHeaders } from "axios";
import {
  getToken,
  transformRequestData,
  handleServiceResult,
  handleResponseError,
  handleBackendError,
  handleAxiosError,
} from "@/utils";

export default class CustomAxiosInstance {
  private instance: AxiosInstance;

  private backendConfig: Service.BackendResultConfig;

  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeField: "code",
      dataField: "data",
      msgField: "message",
      successCode: 200,
    }
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
  }

  /** 设置请求拦截器 */
  private setInterceptor() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      async (config) => {
        if (config.headers) {
          // 数据转换
          const contentType = (config.headers as AxiosHeaders).get("Content-Type") as string;
          config.data = await transformRequestData(config.data, contentType);
          // 设置token
          (config.headers as AxiosHeaders).set("Authorization", getToken());
        }
        return config;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      async (response) => {
        const { status } = response;
        // http状态码成功
        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          const { codeField, dataField, successCode } = this.backendConfig;

          // 后端状态码返回请求成功
          if (backend[codeField] === successCode) {
            response.data = handleServiceResult(null, backend[dataField]);
          } else {
            // 后端状态码返回请求失败
            const error = handleBackendError(backend, this.backendConfig);
            response.data = handleServiceResult(error, null);
          }
        } else {
          // http状态码失败
          const error = handleResponseError(response);
          response.data = handleServiceResult(error, null);
        }

        return response;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }

  public getInstance() {
    return this.instance;
  }

  public getBackendConfig() {
    return this.backendConfig;
  }
}
