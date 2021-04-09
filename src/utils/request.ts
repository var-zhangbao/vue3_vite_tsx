import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { config } from 'node:process'
import { CreateAxiosOptions, Result, RequestOptions } from './type'

export class VAxios {
    private axiosInstance: AxiosInstance
    private options: CreateAxiosOptions

    constructor(options:CreateAxiosOptions) {
        console.log(options)
        this.options = options
        this.axiosInstance = axios.create(options)
        this.setupInterceptors()
    }

    private createAxios(config:CreateAxiosOptions):void {
        this.axiosInstance = axios.create(config)
    }

    /**
     * 设置拦截器
    */

    private setupInterceptors() {
        // 请求拦截
        this.axiosInstance.interceptors.request.use((config:AxiosRequestConfig) => {
            return config
        }, undefined)

        // 响应结果拦截

        this.axiosInstance.interceptors.response.use((res:AxiosResponse<any>) => {
            console.log(res, '222')
            return res;
        }, undefined)
    }

    private getTransform() {
        const { transform } = this.options;
        return transform;
      }
    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: AxiosRequestConfig =config;
        const transform = this.getTransform();
        console.log(transform,'000')
        const { requestOptions } = this.options;
    
        const opt: RequestOptions = Object.assign({}, requestOptions, options);
    
        const { beforeRequestHook, requestCatch, transformRequestData } = transform || {};
        if (beforeRequestHook) {
          conf = beforeRequestHook(conf, opt);
        }
        return new Promise((resolve, reject) => {
          this.axiosInstance
              .request<any, AxiosResponse<Result>>(conf)
              .then((res: AxiosResponse<Result>) => {
                // 请求是否被取消
                const isCancel = axios.isCancel(res)
                console.log(transformRequestData)
                if (transformRequestData && !isCancel) {
                  console.log(opt)
                  const ret = transformRequestData(res, opt);
                  // ret !== undefined ? resolve(ret) : reject(new Error('request error!'));
                  return resolve(ret)
                }
                // reject((res as unknown) as Promise<T>);
              })
              .catch((e: Error) => {
                if (requestCatch) {
                  reject(requestCatch(e));
                  return;
                }
                reject(e);
              });
        });
      }
}

