/** * 加解项解读 */
import request from "@/utils/request";

/**
 * @description 主题列表
 * */
export function customListAPI() {
  return request({
    url: "/home/productList"
  });
}

/**
 *
 * @description 获取素材列表
 * */
export function customMaterialAPI() {
  return request({
    url: "/product/material"
  });
}

/**
 *@description 获取手机模型
* */
export function customDesignAPI(params) {
  return request({
    url: "/product/customized",
    method: "get",
    params
  });
}
