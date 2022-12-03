import { ErrorCode } from "../constant/error";
import BaseError from "./Base";

/**
 * 下载方法错误
 */
class DownloadMethodError extends BaseError {
  constructor(message?: string) {
    super(
      ErrorCode.download_method_error,
      message ?? '下载方法错误'
    );
  }
}

export default DownloadMethodError;
