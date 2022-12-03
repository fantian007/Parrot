import { ErrorCode } from '../constant/error';
import BaseError from './Base'

/**
 * 网络离线错误
 */
class NeworkOfflineError extends BaseError {
  constructor(message?: string) {
    super(
      ErrorCode.network_offline_error,
      message ?? '网络离线，请检查网络连接'
    );
  }
}

export default NeworkOfflineError;
