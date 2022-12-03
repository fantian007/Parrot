import { ResponseInterceptor } from "./interceptor";

/**
 * 响应数据格式
 */
export interface ResponseData<D = any> {
  code: number;
  message: string;
  data?: D;
}

export type ResponseHandler = ResponseInterceptor;