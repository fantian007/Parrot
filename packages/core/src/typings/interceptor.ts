import { AxiosInterceptorManager, AxiosResponse } from 'axios';
import { ParrotRequestConfig } from './parrot';
import { ResponseData } from './response';

export type RequestInterceptor = Parameters<AxiosInterceptorManager<ParrotRequestConfig>['use']>['0'];
export type ResponseInterceptor = Parameters<AxiosInterceptorManager<AxiosResponse<ResponseData>>['use']>['0'];
