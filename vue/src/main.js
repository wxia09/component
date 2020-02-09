import Vue from "vue";

import router from "./router";
import store from "./store";
import App from "./App.vue";

import axios from "./http";

Vue.prototype.$http = axios;

// 全局拦截
router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem("token");
  if (to.meta.requireAuth) {
    if (token) {
      next();
    } else {
      // 这里做相应的操作
    }
  } else {
    next();
  }
});

import message from "./methods/message";

Vue.use(message);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
