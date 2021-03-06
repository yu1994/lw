import axios from "axios";
import { Toast, Dialog } from "vant";
// import { getToken, tokenKey } from '@/utils/auth';
// import store from '../store';

// Toast.allowMultiple();
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
});

let hideFail = false;
/** @description request拦截器 */
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers[tokenKey] = getToken();
    // }
    if (process.env.NODE_ENV === 'development') {
      config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdW5ueSIsImNyZWF0ZWQiOjE1OTQwNDY4MTIxMTcsImV4cCI6MTU5NDY1MTYxMn0.nyeUb6ux9zH7xkV4SML-LlYq9TwsQIZq_o0CUoSKP1Z1NFzF6nyturw_yzsomVhE_VI43ys-Xd6_WbqpFWNvKg";
    } else {
      config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdW5ueSIsImNyZWF0ZWQiOjE1OTQwNDY4MTIxMTcsImV4cCI6MTU5NDY1MTYxMn0.nyeUb6ux9zH7xkV4SML-LlYq9TwsQIZq_o0CUoSKP1Z1NFzF6nyturw_yzsomVhE_VI43ys-Xd6_WbqpFWNvKg";
    }
    return config;
  },
  error => Promise.reject(error)
);

/** @description response 拦截器 */
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (
      response.status === 200 &&
      (res.code === 0 || res.code === 200 || res.code === 20000)
    ) {
      return response.data;
    }
    if (
      response.status === 200 &&
      (response.config.responseType === "arraybuffer" ||
        response.config.responseType === "blob")
    ) {
      return response.data;
    }
    Toast.fail({ message: res.message, forbidClick: true, duration: 3000 });
    return Promise.reject(new Error("error"));
  },
  error => {
    if (
      error.response &&
      (error.response.status === 500 || error.response.status === 550)
    ) {
      // Dialog.alert({ title: '提示', message: error.response.data.message || '请求接口报错!' }).then(() => {
      //   store.dispatch('user/resetToken').then(() => {
      //     window.location.reload();
      //   });
      // });
    }
    if (hideFail === false) {
      // 年选项 说不要错误提示
      Toast.fail({
        message: error.response
          ? error.response.data.message
          : "请检查你的网络!",
        forbidClick: true,
        duration: 3000
      });
    }
    return Promise.reject(error);
  }
);

export default service;
