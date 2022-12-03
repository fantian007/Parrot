/**
 * 取消请求
 */
export interface Cancel {
  /**
   * 模式
   */
  mode?: CancelMode;
}

/**
 * 相同请求ID的请求，前置的请求会被取消
 */
export interface RequestIdCancelMode {
  key: 'requestId';
}

/**
 * 参数比较
 * 
 * @description 参数对象进行深比较，如果存在相同未完成的请求则取消
 */
export interface ParamsDiffCancelMode {
  key: 'paramsDiff',
  params: Record<string, unknown>;
}

/**
 * 取消模式 - 请求ID
 */
export type CancelMode =
  | RequestIdCancelMode
  | ParamsDiffCancelMode;
