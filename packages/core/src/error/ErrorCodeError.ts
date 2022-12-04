import { ErrorCode } from '../constant/error';
import BaseError from './Base'

/**
 * 业务错误
 */
class NeworkOfflineError extends BaseError {
  constructor(message?: string) {
    super(
      ErrorCode.error_code_error,
      message ?? '发生错误'
    );
  }
}

export default NeworkOfflineError;
