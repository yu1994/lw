import { routes } from "@/router";
const getters = {
  keepAliveExclude: () => {
    const keepAlive = [];
    console.info(routes);
    for (let i = 0, len = routes.length; i < len; i += 1) {
      if (routes[i].meta && routes[i].meta.keepAlive === false) {
        keepAlive.push(routes[i].name);
      }
    }
    return keepAlive;
  }
};
export default getters;
