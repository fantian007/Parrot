import { AxiosInstance } from 'axios';
import { isFunction } from 'lodash';
import { ParrotRequestConfig } from '../typings/parrot';
import {
  checkNetwork,
  requestId,
  urlParams,
  successCode
} from '../interceptors';
import { isMessageErrorHandle } from '../typings/error';

/**
 * 处理拦截器
 */
export const processInterceptors = (axiosInstance: AxiosInstance, config?: ParrotRequestConfig) => {
  const {
    request: requestInterceptors,
    response: responseInterceptors
  } = axiosInstance.interceptors;

  requestInterceptors.use(checkNetwork);
  requestInterceptors.use(requestId);
  requestInterceptors.use(urlParams);

  responseInterceptors.use(successCode);

  if (config) {
    const {
      requestHandler,
      responseHandler,
      errorHandler
    } = config;

    // 请求处理
    requestInterceptors.use(requestHandler);
    // 响应处理
    responseInterceptors.use(responseHandler);

    // 错误处理
    if (errorHandler) {
      responseInterceptors.use(_ => _, error => {
        if (isMessageErrorHandle(errorHandler)) {
          const {
            handler
          } = errorHandler;

          const message = error?.message ?? '未知错误';

          handler(message);
  
        } else if (isFunction(errorHandler)) {
          errorHandler(error);
        }

        return Promise.reject(error);
      });
    }
  }
}

export default processInterceptors;
