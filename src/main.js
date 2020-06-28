import Vue from "vue";
import tel from "./components";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import variable from "@/assets/styl/variable.styl";
import "./assets/styl/index.styl";
Object.keys(tel).forEach(key => {
  Vue.use(tel[key]);
});
Vue.config.productionTip = false;
Vue.prototype.$variable = variable;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
