import QS from 'query-string';
import { isEmpty, merge, pick } from 'lodash';
import { RequestInterceptor } from '../../typings/interceptor';
import { ParrotRequestConfig } from '../../typings/parrot';

/**
 * 添加请求 ID
 */
const urlParams: RequestInterceptor = (config: ParrotRequestConfig) => {
  const {
    method = 'GET',
    urlParams
  } = config;

  const keys = urlParams?.keys;

  const parmas = QS.parse(location.search);

  if (!isEmpty(parmas)) {
    let pickParams: QS.ParsedQuery<string> = {};

    if (keys === 'all') {
      pickParams = parmas;
    } else {
      pickParams = pick(parmas, keys ?? []);
    }

    switch (method) {
      case 'GET':
        config.params = merge<ParrotRequestConfig['params'], unknown>(config.params, pickParams);
        break;
      default:
        config.data = merge<ParrotRequestConfig['data'], unknown>(config.data, pickParams);
        break;
    }
  }

  return config;
}

export default urlParams;
