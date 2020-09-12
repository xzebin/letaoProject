// 封装axios实例
import axios from "axios";
import store from "@/store/store.js";
import {sleep} from "@/util/sleep.js";
import {
  Toast
} from "vant";
const instance = axios.create({
  // baseURL: 'http://47.112.194.162:8787/api',
  baseURL: process.env.VUE_APP_urlPath
});

// 添加请求拦截器
instance.interceptors.request.use(async function (config) {
  // if(config.url.indexOf("addFeedBack") > -1){
  //   config.baseURL = "http://47.112.194.162:8787";
  // }
  //设置请求头解决缓存问题
  // let val = "v=" + Math.random();
  // config.url = config.url.indexOf("?") > -1 ? config.url + `&${val}` : config.url + `?${val}`;
  config.headers["If-Modified-Since"] = 0;
  store.commit("updataPedding",true);
  await sleep(500);
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  store.commit("updataPedding",false);
  return response.data;
}, function (error) {
  if (!localStorage.getItem("token")) {
    Toast(error.response.data.message);
  } else {
    Toast("用户信息已过期，请重新登录");
  }
  location.href = "#/login";
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;