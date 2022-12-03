import { AxiosProgressEvent } from "axios";

/**
 * 上传
 */
export interface Upload {
  /**
   * 上传地址
   */
  url: string;
  /**
   * 文件上传字段
   * @default file
   */
  field: string;
  /**
   * 文件
   */
  file: File;
  /**
   * 文件上传进度 回调
   */
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
}
