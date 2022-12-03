import { AxiosInterceptorManager, AxiosResponse } from 'axios';
import { ParrotRequestConfig } from './parrot';
import { ResponseData } from './response';

export type RequestInterceptor = AxiosInterceptorManager<ParrotRequestConfig>['use'];
export type ResponseInterceptor = AxiosInterceptorManager<AxiosResponse<ResponseData>>['use'];
