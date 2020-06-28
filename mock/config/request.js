import axios from "axios";
// import store from '../store';
// import { getToken } from '@/utils/auth';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_MOCK_API,
  timeout: 18000 // 请求超时时间
});

// request拦截器
// service.interceptors.request.use(
//   config =>
//     // if (store.getters.token) {
//     // //  config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//     // }
//   // eslint-disable-next-line
//   config,
//   (error) => {
//     Promise.reject(error);
//   },
// );

// response 拦截器
service.interceptors.response.use(
  //  response => response.data,
  response => {
    const res = response.data;
    if (response.status !== 200 || res.code !== 20000) {
      // eslint-disable-next-line
      return Promise.reject('error');
    }
    return response.data;
  },
  error => {
    console.log(error.response)
    console.log(error)
    return Promise.reject(error);
  }
);

export default service;
