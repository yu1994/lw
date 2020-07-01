import request from "../config/request";

export function customListMockAPI() {
  return request({
    url: "/custom/list",
    method: "get"
  });
}
