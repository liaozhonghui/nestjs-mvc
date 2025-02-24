import * as dayjsModule from 'dayjs';
import 'dayjs/locale/en'; // 引入英语环境支持
dayjsModule.locale('en');
import * as utc from 'dayjs/plugin/utc'; // 引入 UTC 插件
import * as timezone from 'dayjs/plugin/timezone'; // 引入 UTC 插件

dayjsModule.extend(utc);
dayjsModule.extend(timezone);

export const dayjs = dayjsModule;
