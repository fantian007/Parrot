/**
 * 重试
 */
export type Retry =
  /**
   * 启用重试
   */
  | true
  | {
    /**
     * 重试次数
     */
    count: number;
  };
