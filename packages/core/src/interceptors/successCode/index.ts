import { AxiosResponse } from 'axios';
import { ResponseInterceptor } from '../../typings/interceptor';
import { ResponseData } from '../../typings/response';
import ErrorCodeError from '../../error/ErrorCodeError'

/**
 * 添加请求 ID
 */
const successCode: ResponseInterceptor = (response: AxiosResponse<ResponseData>) => {
  const { request } = response;

  const { successCode = 0 } = request;
  const { data } = response;
  const { code } = data;

  if (successCode === code) {
    return response;
  } else {
    return Promise.reject(new ErrorCodeError());
  }
}

export default successCode;
