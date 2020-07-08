import request from "../config/request";

export function customListMockAPI() {
  return request({
    url: "/custom/list",
    method: "get"
  });
}

export function customDesignMockAPI() {
  return request({
    url: "/custom/design",
    method: "get"
  });
}
