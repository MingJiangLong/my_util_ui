import { REDIRECT_URL } from '@/config';

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
    timeout: 20000,
    baseURL: process.env.NODE_ENV === 'development' ? '' : 'http://42.192.81.29/api'
});

// 默认请求头
const defaultHeader = {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=utf-8",
}


// 请求拦截
instance.interceptors.request.use(function (config) {
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// // 返回拦截
instance.interceptors.response.use(function (response) {
    return response;
}, async function (error: any) {


});





async function httpUtil<T>(
    url: string,
    method: HttpMethod,
    data?: any,
    config?: AxiosRequestConfig
): Promise<T> {
    let requestConfig: AxiosRequestConfig = {};
    requestConfig.headers = defaultHeader;// 头部信息   
    requestConfig.method = method; // 请求类型         
    requestConfig.url = url;// 路由信息                
    if (method === 'GET') { // 参数                 
        requestConfig.params = data
    }
    if (method === 'POST') {
        requestConfig.data = data;
    }

    // TODO:携带用户信息处理
    requestConfig = {
        ...requestConfig,
        ...config
    }

    try {

        let { data: axiosData } = await instance.request(requestConfig);
        return axiosData as T;
    } catch (error: any) {
        throw error;
    }
}



export type RequestConfig = {
    axiosConfig?: AxiosRequestConfig
}
export type HttpMethod = 'GET' | 'POST'
export type ResponseData<T> = {
    code: number
    message: string
    data: T
}

const Http = {
    post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return httpUtil<T>(url, 'POST', data, config)
    },
    fetch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return httpUtil<T>(url, 'GET', data, config)
    },
}

export default Http;