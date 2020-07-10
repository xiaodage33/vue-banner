import axios from "axios"
import { Message } from "element-ui";

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '';
const service = axios.create({
    // baseURL:'http://127.0.0.1:9999/vv/',
    baseURL:BASEURL,
    timeout:20000,
});
/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 后台需要前端这边传相关的参数（在请求头添加参数）
    // Tokey
    // userId
    // sui
    // 业务需求
    // 最终目地不是在请求头添加参数
    config.headers['Tokey'] = 111;
    config.headers['UserName'] = 222;
    return config;
}, function (error) {
// 对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(function (response) {
    console.log('res', response);
    // 对响应数据做点什么
    const data = response.data
    // // // 业务需求
    console.log('拦截器位置-打印response：',typeof data)
    if(data.stu_name == 0) {
        Message.error(data.stu_name);
        return Promise.reject(data);
    }else{
        return response;
        // return Promise.resolve(data);
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
//
// //测试
// service.request({
//     method: 'get',
//     url:'/__api__/index',
//     data:{
//         firstName:'fred',
//         lastName:'finstone'
//     }
//
// })
export default service;
/**
 * 使用export default时，但不能同时存在多个default。
 * 文件 import 不需要花括号，
 */