import {
  Search,
  Sticky,
  NavBar,
  Toast,
  Dialog,
  List,
  Cell,
  CellGroup,
  Uploader,
  Button,
  Icon
} from "vant";

const modulesFiles = require.context("./modules", true, /\.vue$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
const tel = {
  Search,
  Sticky,
  NavBar,
  Toast,
  Dialog,
  List,
  Cell,
  CellGroup,
  Uploader,
  Button,
  Icon
};
Object.keys(modules).forEach(key => {
  tel[key] = Vue => {
    Vue.component(key, modules[key]);
  };
});
export default tel;
