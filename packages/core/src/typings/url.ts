/**
 * url 参数
 */
export interface UrlParams {
  /**
   * 携带字段
   * 
   * @default 'all'
   */
  keys?:
  /**
   * 收集所有 url seach 字段
   */
  | 'all'
  /**
   * 自定义需要收集的 url search 字段
   */
  | string[];
}
