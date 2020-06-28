import request from "../config/request";

export function getListAPI(params) {
  return request({
    url: "/article/pv",
    method: "get",
    params
  });
}
