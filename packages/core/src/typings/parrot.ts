import type { AxiosRequestConfig } from 'axios';
import type { Retry } from './retry';
import type { UrlParams } from './url';
import type { Cancel } from './cancel';
import type { ErrorHandler } from './error';
import type { RequestHandler } from './request';
import type { ResponseHandler } from './response';

/**
 * Parrot 请求配置
 */
export interface ParrotRequestConfig<D = any> extends AxiosRequestConfig<D> {
  /**
   * 请求ID
   */
  requestId?: keyof any;
  /**
   * 重试
   */
  retry?: Retry;
  /**
   * url 参数携带
   */
  urlParams?: UrlParams;
  /**
   * 取消请求
   */
  cancel?: Cancel;
  /**
   * 正确响应 code
   * 
   * @default 0
   */
  successCode?: number;
  /**
   * 正确响应时是否返回 data
   * 
   * @dfault true
   */
  fetchData?: boolean;
  /**
   * 请求处理
   */
  requestHandler?: RequestHandler;
  /**
   * 响应处理
   */
  responseHandler?: ResponseHandler;
  /**
   * 错误处理
   */
  errorHandler?: ErrorHandler;
}
