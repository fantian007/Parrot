import { ErrorCode } from '../constant/error';

/**
 * 错误基类
 */
class BaseError<D = any> extends Error {
  code: ErrorCode;
  data?: D;

  constructor(code: ErrorCode, message: string, data?: D) {
    super(message);

    this.code = code;
    this.data = data;
  }
}

export default BaseError;
