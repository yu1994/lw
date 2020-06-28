const mode = process.env.NODE_ENV;
module.exports = {
  /** @type {string}
   * @description website title
   * */
  title: "1111",

  /** @type {Array}
   * @description no judgement permission required */
  whiteList: [
    "/login",
    "/forget",
    "/login-otp",
    "/alipay",
    "/success",
    "/protocol-login",
    "/report-file-down"
  ],

  imgUrl: "/wx/file/showImg", // 图片地址

  /** @type {Boolean}
   * @description 判断是否 有 获取openid  judge 为 true 不去判断 */
  judge: mode !== "production", // mode !== 'production'

  /** @type {Boolean}
   * @description 微信 debug */
  debug: false,

  /** *
   * @type {String} wxdf478c20c2f05d98 益往健康  wxc87d0aa97be32b04 建达通
   * */
  appid: "wxc87d0aa97be32b04",

  /** @type {String}
   * @description aes key
   * */
  aesKey: "hzywjk0123456789",

  /** @type {String}
   * @description aes iv
   * */
  aesIv: "9876543210kjwyzh"
};
/**
 * @description
 *3.不清楚生产路径
 *
 * */
