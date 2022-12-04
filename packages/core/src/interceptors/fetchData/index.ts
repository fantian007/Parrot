import { AxiosResponse } from 'axios';
import { ResponseInterceptor } from '../../typings/interceptor';
import { ResponseData } from '../../typings/response';

/**
 * 返回业务数据
 */
const fetchData: ResponseInterceptor = (response: AxiosResponse<ResponseData>) => {
  const { request } = response;

  const { fetchData = true } = request;
  const { data } = response;

  const { data: _data } = data

  if (fetchData) {
    return _data;
  } else {
    return response;
  }
}

export default fetchData;
