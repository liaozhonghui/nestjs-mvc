import { Injectable, LoggerService } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import * as responseTime from 'response-time';
import { CustomLogger } from '../logger/log.logger';
import * as async_hooks from 'node:async_hooks';

function validPath(url) {
  let valid = false;
  /**
   * 修改成正则进行优化
   */
  ['orderNotification', 'h5', 'api'].forEach((item) => {
    if (url.slice(1, item.length + 1) === item) {
      valid = true;
    }
  });
  ['login', 'binding', 'ping'].forEach((item) => {
    if (url.slice(1) === item) {
      valid = true;
    }
  });
  return valid;
}
@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  private logger: LoggerService = new CustomLogger();
  constructor() {}
  use(req: any, res: any, next: any) {
    const start = Date.now(); // 请求开始时间
    const contextId = async_hooks.executionAsyncId();
    if (!validPath(req.originalUrl)) {
      res.status(403).send('Forbidden');
      return;
    }
    req.id = contextId; // 将上下文 ID 保存到请求对象上
    res.on('finish', () => {
      // 用来跟responseTime进行对比
      const duration = Date.now() - start; // 计算请求处理的时间
      this.logger.log(
        req,
        `Response Time: ${res.get('x-response-time')}ms, res.finished: ${duration}ms`,
      );
    });

    responseTime({
      digits: 1,
      header: 'x-response-time',
      suffix: false,
    })(req, res, next);
  }
}
