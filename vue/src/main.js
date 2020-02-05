import Vue from "vue";

import router from "./router";
import store from "./store";
import App from "./App.vue";

import axios from "./http";

Vue.prototype.$http = axios;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
