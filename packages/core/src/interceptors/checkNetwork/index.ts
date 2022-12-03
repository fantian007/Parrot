import { RequestInterceptor } from '../../typings/interceptor';
import { ParrotRequestConfig } from '../../typings/parrot';
import { getIsOnline } from '../../utils/network';
import { NeworkOfflineError } from '../../error';

/**
 * 检测网络状态
 */
const checkNetwork: RequestInterceptor = (config: ParrotRequestConfig) => {
  const isOnline = getIsOnline();

  if (!isOnline) {
    return Promise.reject(new NeworkOfflineError());
  }

  return config;
}

export default checkNetwork;
