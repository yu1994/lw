/*eslint-disable*/
import Mock from 'mockjs';
import { param2Obj } from './config/utils';
import article from './data/article';
import custom from './data/customList'

const mocks = [
  ...article,
  ...custom
 ];

// for front mock
// 请谨慎使用，它将重新定义XMLHttpRequest,
// 这将导致许多第三方库失效
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    this.proxy_send(...arguments);
  };

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null;
      if (respond instanceof Function) {
        const { body, type, url } = options;
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url),
        });
      } else {
        result = respond;
      }
      return Mock.mock(result);
    };
  }
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response));
  }
}

// for mock server
const responseFake = (url, type, respond) => ({
  url: new RegExp(`/mock${url}`),
  type: type || 'get',
  response(req, res) {
    res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond));
  },
});
export default mocks.map(route => responseFake(route.url, route.type, route.response));
