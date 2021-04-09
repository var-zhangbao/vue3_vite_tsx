import {VAxios} from './request'
import {AxiosTransform} from './axiosTransform';
import axios, {AxiosResponse} from 'axios';
import qs from 'qs'
import { isString } from './is';
import { RequestOptions, Result } from './type';
const isDev = false
const transform: AxiosTransform = {
     // 请求之前处理config
     beforeRequestHook: (config, options) => {
         
         console.log(options)
        const {apiUrl, joinPrefix, joinParamsToUrl, formatDate, isParseToJson} = options;

        config.url = isDev ? `/api${config.url}` : `${apiUrl || ''}${config.url}`;
        // config.url = `http://localhost:8899${config.url}`
        console.log(config)
        if (config.method === 'get') {
            const now = new Date().getTime();
            if (!isString(config.params)) {
                config.data = {
                    // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                    params: Object.assign(config.params || {}, {
                        _t: now,
                    }),
                };
            } else {
                // 兼容restful风格
                config.url = config.url + config.params + `?_t=${now}`;
                config.params = {};
            }
        } else {
            if (!isString(config.params)) {
                config.data = config.params;
                config.params = {};
                if (joinParamsToUrl) {
                    // config.url = setObjToUrlParams(config.url as string, config.data);
                    // return config.url
                    config.url = config.url
                }
            } else {
                // 兼容restful风格
                config.url = config.url + config.params;
                config.params = {};
            }
            // 'a[]=b&a[]=c'
            if (!isParseToJson) {
                config.params = qs.stringify(config.params, {arrayFormat: 'brackets'})
                config.data = qs.stringify(config.data, {arrayFormat: 'brackets'})
            }
        }
        return config;
    },
    requestInterceptors: (config) => {
        // 请求之前处理config
        const token = '111'
        if (token) {
          // jwt token
          config.headers.token = token;
        }
        return config;
    },
     /**
     * @description: 处理请求数据
     */
      transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
        const {isTransformRequestResult, isShowMessage = true,isShowErrorMessage, isShowSuccessMessage, successMessageText, errorMessageText} = options;

        const reject = Promise.reject

        const {data} = res;
        //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
        const {status, message} = data;
        // 请求成功
        const hasSuccess = data && Reflect.has(data, 'code')
        // 是否显示提示信息
        if (isShowMessage) {
            if (hasSuccess && (successMessageText || isShowSuccessMessage)) { // 是否显示自定义信息提示
                // Message.success(successMessageText || message ||  '操作成功！')
            } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) { // 是否显示自定义信息提示
                // Message.error(message || errorMessageText || '操作失败！')
            } else if (!hasSuccess && options.errorMessageMode === 'modal') { // errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
                // Modal.confirm({title: '错误提示', content: message});
            }
        }
        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (!isTransformRequestResult) {
            return res.data;
        }

        if (!data) {
            // return '[HTTP] Request has no return value';
            return reject(data);
        }

        // 接口请求成功，直接返回结果
        if (status === 200) {
            return data;
        }
        // 接口请求错误，统一提示错误信息
        // if (status === 500) {
        //     if (message) {
        //         Message.error(data.message);
        //         Promise.reject(new Error(message));
        //     } else {
        //         const msg = '操作失败,系统异常!';
        //         Message.error(msg);
        //         Promise.reject(new Error(msg));
        //     }
        //     return reject();
        // }

        // 登录超时
        // if (status === ResultEnum.TIMEOUT) {
        //     if (router.currentRoute.value.name == 'login') return
        //     // 到登录页
        //     const timeoutMsg = '登录超时,请重新登录!';
        //     Modal.destroyAll()
        //     Modal.warning({
        //         title: '提示',
        //         content: '登录身份已失效,请重新登录!',
        //         onOk: () => {
        //             router.replace({
        //                 name: 'login',
        //                 query: {
        //                     redirect: router.currentRoute.value.fullPath
        //                 }
        //             })
        //             storage.clear()
        //         }
        //     });
        //     return reject(new Error(timeoutMsg))
        // }

        // 这里逻辑可以根据项目进行修改
        if (!hasSuccess) {
            return reject(new Error(message));
        }

        return data;
    },
}
const Axios = new VAxios({
    // timeout: 15 * 1000,
    headers: {},
    transform,
    withCredentials: false,
    // apiUrl: 'http://localhost:8899/',
})

export default Axios;