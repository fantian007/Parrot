import { AxiosProgressEvent, Method } from "axios";

export interface DownloadCom {
  /**
   * 下载地址
   */
  url: string;
  /**
   * 下载文件名
   */
  filename?: string;
}

/**
 * GET 下载
 */
export interface GetDownload extends DownloadCom {
  /**
   * POST 请求
   */
  method: 'GET';
}

/**
 * POST 下载
 */
export interface PostDownload extends DownloadCom {
  /**
   * POST 请求
   */
  method: 'POST';
  /**
   * 下载进度回调
   */
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
}

/**
 * 下载
 */
export type Download =
  | GetDownload
  | PostDownload;
