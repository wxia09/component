import axios from "axios";
import router from "../router";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "";
let token = window.localStorage.getItem("token");
axios.interceptors.request.use(
  config => {
    // 在这里可以进行些设置, 可以添加store
    // 会作用于全局的axios
    if (token) config.headers.Authorization = token;
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  resopnse => resopnse,
  error => {
    if (error.response) {
      // 根据需求做相应的修改、消息通知
      console.log(error.response.status);
      switch (error.response.status) {
        case 400:
          // 请求无效
          break;
        case 401:
          // 无权限
          if (token) window.localStorage.removeItem("token");
          // 这里如果是在登录页, 可以不跳转, 需要加个判断
          router.replace({
            path: "/",
            query: { redirect: router.currentRoute.path }
          });
          break;
        case 403:
          // 禁止访问
          break;
        case 422:
          // 请求格式正确, 但是语义错误, 导致服务器不能响应
          break;
        case 500:
          // 服务器报错
          break;
      }
      return Promise.reject(error.response.data);
    }
  }
);

export default axios;
