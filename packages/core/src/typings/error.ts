import { AxiosError } from "axios";
import { get } from 'lodash';
import BaseError from "../error/Base";
import { ParrotRequestConfig } from "./parrot";
import { ResponseData } from './response';

/**
 * 错误
 */
export interface ParrotError extends Omit<AxiosError, 'config'> {
  config?: ParrotRequestConfig;
}

/**
 * 错误处理-消息
 */
export interface MessageErrorHandler {
  mode: 'message';
  handler: (message: ResponseData['message']) => void;
}

/**
 * 错误处理-自定义
 */
export interface CustomErrorHandler {
  (error: any): void;
}

/**
 * 错误处理
 */
export type ErrorHandler =
  | MessageErrorHandler
  | CustomErrorHandler;

/**
 * 是否消息处理错误
 */
export const isMessageErrorHandle = (handler: ErrorHandler): handler is MessageErrorHandler => get(handler, 'mode') === 'message';