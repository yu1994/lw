import request from "@/utils/request";

/**
 *@description 获取手机模型
 * */
export function cartAddAPI(data) {
  return request({
    url: "/cart/add",
    method: "post",
    data
  });
}
