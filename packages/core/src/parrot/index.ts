import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Download, PostDownload } from '../typings/download';
import { ParrotRequestConfig } from '../typings/parrot';
import { ResponseData } from '../typings/response';
import { Upload } from '../typings/upload';
import { saveFileByALink, saveFileByFileSaver } from '../utils/download';
import DownloadMethodError from '../error/DownloadMethodError';

/**
 * Parrot - 🦜
 */
class Parrot {
  axiosInstance: AxiosInstance;

  /**
   * 创建 Parrot 实例
   * @param config {ParrotRequestConfig} - 配置项
   */
  constructor(config?: ParrotRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  /**
   * 获取 Uri 资源
   * @param config 配置项
   * @returns Uri
   */
  getUri(config?: ParrotRequestConfig) {
    return this.axiosInstance.getUri(config);
  }

  /**
   * GET 请求
   * @param url {string} - 请求地址
   * @param config {ParrotRequestConfig} - 配置项
   * @returns 
   */
  get<T = any, R = ResponseData<T>, D = any>(url: string, config?: ParrotRequestConfig<D>): Promise<R> {
    return this.axiosInstance.get(url, config);
  }

  /**
   * POST 请求
   * @param url {string} - 请求地址
   * @param data {any} - 参数对象
   * @param config {ParrotRequestConfig} - 配置项
   * @returns 
   */
  post<T = any, R = ResponseData<T>, D = any>(url: string, data?: D, config?: ParrotRequestConfig<D>): Promise<R> {
    return this.axiosInstance.post(url, data, config);
  }

  /**
   * PUT 请求
   * @param url {string} - 请求地址
   * @param data {any} - 参数对象
   * @param config {ParrotRequestConfig} - 配置项
   * @returns 
   */
  put<T = any, R = ResponseData<T>, D = any>(url: string, data?: D, config?: ParrotRequestConfig<D>): Promise<R> {
    return this.axiosInstance.put(url, data, config);
  }

  /**
   * DELETE 请求
   * @param url {string} - 请求地址
   * @param config {ParrotRequestConfig} - 配置项
   * @returns 
   */
  delete<T = any, R = ResponseData<T>, D = any>(url: string, config?: ParrotRequestConfig<D>): Promise<R> {
    return this.axiosInstance.delete(url, config);
  }

  /**
   * 上传
   * @param option {Upload} - 上传配置
   * @param config {ParrotRequestConfig} - 配置项
   * @returns 
   */
  upload<T = any, R = ResponseData<T>>(option: Upload, config?: ParrotRequestConfig<FormData>): Promise<R> {
    const {
      url,
      field,
      file,
      onProgress
    } = option;

    const formData = new FormData();
    formData.append(field, file, file.name);

    const nextCfg: AxiosRequestConfig = Object.assign<Partial<AxiosRequestConfig<FormData>>, AxiosRequestConfig<FormData> | undefined>({
      url,
      method: 'POST',
      data: formData,
      onUploadProgress: onProgress
    }, config);

    return this.axiosInstance(nextCfg);
  }

  async download<T = any, R = ResponseData<T>>(option: Download, config?: ParrotRequestConfig): Promise<void> {
    const {
      url,
      filename,
      method = 'GET'
    } = option;

    switch (method) {
      case 'GET':
        try {
          const res = await this.axiosInstance.get(url, Object.assign<Partial<ParrotRequestConfig>, ParrotRequestConfig | undefined>({
            responseType: 'blob'
          }, config));

          const { headers, data } = res;

          saveFileByALink({
            headers,
            data: new Blob([data]),
            filename
          });
        } catch (error) {
          return Promise.reject(error);
        }

        break;
      case 'POST':
        const {
          onProgress
        } = option as PostDownload;

        const nextCfg: AxiosRequestConfig = Object.assign<Partial<ParrotRequestConfig>, ParrotRequestConfig | undefined>({
          responseType: 'blob',
          onDownloadProgress: onProgress
        }, config);

        const res = await this.axiosInstance.post(url, nextCfg);

        const { headers, data } = res;

        saveFileByFileSaver({
          headers,
          data: new Blob([data]),
          filename
        });
        break;
      default:
        throw new DownloadMethodError();
    }
  }
}

export default Parrot;
