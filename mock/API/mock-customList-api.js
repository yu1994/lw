import request from "../config/request";

export function customListAPI() {
  return request({
    url: "/custom/list",
    method: "get"
  });
}
