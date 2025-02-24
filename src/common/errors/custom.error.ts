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

  OSS_SERVICE_ERROR = 701, // oss服务错误
  UNKNOWN = 999, // 未知错误
}

export class ILLegalArgumentException extends CustomError {
  constructor(msg: string) {
    super(ERROR_CODE.ILLEGAL_ARGUMENT, msg);
  }
}

export class OSSUploadException extends CustomError {
  constructor(msg: string) {
    super(ERROR_CODE.OSS_SERVICE_ERROR, msg);
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
   * 基本页面：首页，播放页，追剧，我的，充值页
   */
  COLLECT_BOOK_OFFLINE = 610, // 收藏时，短剧已下架
  COLLECT_PARAM_ERROR = 611, // 收藏时，传参错误，chapter_id和book_id对不上.
  LACK_REGION_PLAN = 612, // 缺少首页方案(app端显示无数据)
  LACK_GIFT_GROUP = 613, // 缺少充值档位分组
  RECHARGE_REPEAT = 614, // 订单已经充值过了
  INSUFFICIENT_BALANCE = 615, // 余额不足
  BOOK_CHAPTER_UPDATED = 616, // 卡点计费，短剧信息更新了
  RECHARGE_TIMES_LIMIT = 617, // 订单已经到达充值次数限制
  TL_GIFT_EXPIRED = 618, // 限时礼包已经过期

  /**
   * 支付订单
   */
  PAY_API_ERROR = 620, // 支付接口调用失败
  APPLE_VERIFY_ERROR = 621, // 苹果支付验证失败
  ANDROID_VERIFY_ERROR = 622, // 谷歌支付验证失败
  RECHARGE_PARAMS_ERROR = 623, // 充值参数错误
  APPLE_SUBSCRIPTION_USED = 624, // 苹果订阅已被其他账号占用

  STARTUP_BOOK_NULL = 630, // 启动时，短剧不存在

  /**
   * 广告解锁
   */
  VIEW_AD_TIMES_NOT_ENOUGH = 631, // 用户看的广告数未达到解锁条件
  NO_MATCHED_AD_CATEGORY = 632, // 没有匹配到用户分层
  AD_UNLOCK_NOT_AVALIABLE = 633, // 当前剧集不能使用广告解锁
  AD_UNLOCK_TIMES_EXCEEDED = 634, // 今日广告解锁次数已用完

  /**
   * 任务系统
   */
  TASK_NOT_FOUND = 640, // 任务不存在
  TASK_REWARDED = 641, // 任务奖励已经领取
  EMAIL_EXISTED = 642, // 邮箱已被占用
  TASK_ACROSS_DATE = 643, // 任务不能跨天领取
  TASK_NOT_COMPLETED = 644, // 任务未完成
  TASK_RECEIVED = 645, // 任务已经领取
  CHECKIN_TASK_AD_INVALID = 646, // 签到看广告跨天了，此次上报无效
  EMAIL_TOO_MANY_TIMES = 647, // 邮箱已发送过太多次
  EMAIL_DURATION_TOO_SHORT = 648, // 邮箱已发送过太短的时间
  EMAIL_SEND_ERROR = 649, // 邮件发送异常

  /**
   * 分享
   */
  SHARE_BOOK_NOT_EXIST = 660, // 分享的短剧不存在

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
