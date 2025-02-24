import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(
    public code: number,
    public msg: string,
  ) {
    super(msg, HttpStatus.OK);
  }
  getStatus(): number {
    return this.code;
  }
}

export enum ERROR_CODE {
  DEFLAULT = 200, // 默认

  ILLEGAL_ARGUMENT = 422, // 参数错误

  USER_NOT_GENERATE = 601, // 用户未生成
  USER_HAS_BIND = 602, // 用户已绑定
  USER_HAS_DELETED = 603, // 用户已删除

  UNKNOWN = 999, // 未知错误
}

export class ILLegalArgumentException extends CustomError {
  constructor(msg: string) {
    super(ERROR_CODE.ILLEGAL_ARGUMENT, msg);
  }
}

export enum CODE {
  OK = 200, // 成功

  BAD_REQUEST = 400, // 接口传参缺少
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // Api不存在
  PARAM_ERROR = 422, // 传参错误
  DATA_DECODE_ERROR = 499, // xxt解码错误

  INTERNAL_SERVER_ERROR = 500, // 服务器内部错误
  SERVICE_UNAVAILABLE = 503, // 服务不可用

  BINDED = 601, // 已经绑定过
  EXPIRED = 602, // token过期
  BALANCE_NOT_EMPTY = 603, // 注销失败，当前账号内有余额无法注销！
  LOGIN_VALIDATE = 604, // 登录上报信息缺少
  iS_BANNED = 605, // 用户被屏蔽
  DEVICE_LIMIT_TOUCH = 606, // 设备数达到上限,登录设备为5个，重新登录
  DEVICE_IS_DELETED = 607, // 设备已注销
  GOOGLE_ACCOUNT_TOKEN_VERIFY_ERROR = 608, // 设备已注销

  /**
   * 订阅
   */
  SUBSCRIPTION_EXPIRED_WITH_HISTORY = 670, // 订阅过期，且有历史记录
  SUBSCRIPTION_EXPIRED_WITHOUT_HISTORY = 671, // 订阅过期，且没有历史记录
  SUBSCRIPTION_PAY_SHOULD_ONLY_ONE = 672, // 当前用户正在订阅中，不能同时订阅两次
  SUBSCRIPTION_VALID_WITH_HISTORY = 673, // 当前订阅生效中，无法重新订阅
  SUBSCRIPTION_NOT_EMPTY = 674, // 注销失败，当前账号内有订阅无法注销！
  SUBSCRIPTION_APPLE_EXPIRED_TIME_ERROR = 675, // apple订阅订单早已过期

  UNKOWN = 999,
}
