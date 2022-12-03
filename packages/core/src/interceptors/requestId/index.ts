import { RequestInterceptor } from '../../typings/interceptor';
import { ParrotRequestConfig } from '../../typings/parrot';

/**
 * 添加请求 ID
 */
const requestId: RequestInterceptor = (config: ParrotRequestConfig) => {
  const { requestId } = config;

  if (requestId) {
    config.requestId = requestId;
  }

  return config;
}

export default requestId;
