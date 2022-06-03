import { Context } from 'egg';

const WARN = 'Invalid Date';

class CustomResponse {
  ctx: Context;
  constructor(ctx) {
    this.ctx = ctx;
  }

  success(data:number):void {
    this.ctx.body = data;
  }

  error(code: number, message = WARN): void {
    this.ctx.status = code;
    this.ctx.body = message;
  }
}

const _CustomResponse = Symbol('Context#CustomResponse');

module.exports = {
  /**
   * 获取用户ip
   * @param {string} strategy 'guess': 不怕伪造，获取最可能的，'trust': 获取受信头部设置的ip，'remote': 获取请求带过来的ip(参考koa的ctx.request.ip)
   */
  clientIp(strategy = 'guess') {
    // 直连ip
    const remoteAddress = this.request.ip;
    const headers = this.headers;
    // 受信nginx头
    const trustNginxIp = headers['x-real-ip'] || headers['remote-host'];
    let ipList = [];
    if (headers['x-forwarded-for']) {
      ipList = headers['x-forwarded-for'].split(',');
    }
    const noIp = '::1';

    let result = noIp;
    // 猜，获取最有可能的用户ip，可能会拿到伪造的
    if (strategy === 'guess') {
      result = ipList[0] || trustNginxIp || remoteAddress || noIp;
    } else if (strategy === 'trust') { // 获取值得信任的，最后一跳过来的ip，比如值得信任的nginx代理
      result = trustNginxIp || ipList[ipList.length - 1] || remoteAddress || noIp;
    } else if (strategy === 'remote') { // 请求带过来的ip
      result = remoteAddress || noIp;
    }
    return result;
  },


  /**
   * 添加customResponse singleton
   */
  get customRes():CustomResponse {
    if (!this[_CustomResponse]) {
      this[_CustomResponse] = new CustomResponse(this);
    }
    return this[_CustomResponse];
  },

};
