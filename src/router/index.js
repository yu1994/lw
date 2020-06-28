import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

const modulesFiles = require.context("./modules", true, /\.js/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  modules = modules.concat(value.default);
  return modules;
}, []);

Vue.use(Router);

export default new Router({
  routes: [
    ...modules,
    {
      path: "/",
      name: "home",
      redirect: "/custom-list",
      component: Home
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test")
    }
  ]
});
