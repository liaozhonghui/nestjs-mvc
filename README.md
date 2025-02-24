# Nestjs-MVC

Nestjs backend template for Node.js Basic FrameWork;

### Basic Config

一、环境变量

支持不同环境变量配置（`local`, `pre`, `prod`）,如果需要测试环境，可增加test/staging环境的配置。

`config.default.ts`

`config.[env].ts`

二、业务错误码

此为自定义异常，定义业务错误码

[custom.error.ts](./src/common/errors/custom.error.ts)

三、全局错误捕捉器

此为捕获应用的所有异常情况，web异常会返回指定的错误格式

[exception.filter.ts](./src/common/filters/exception.filter.ts)

四、接口返回格式

使用常规的`json`返回格式， `code`, `msg`, `data`

[response.dto.ts](./src/common/dto/response.dto.ts)

五、response中间件，接口响应计时

1. 拦截非法路由地址（`403 Forbidden`）
2. 设置`async_hooks`，链路追踪
3. 响应耗时`x-response-time`

六、`client ip`中间件

1. 获取请求客户端`ip`, `ip`对应的国家代码（ip查询国家码原理是二分查找）
2. ip限流（可由云服务商做这个防护）

七、请求体的加解密

设计一个`json`加解密算法，进行安全防护


八、其他设置

1. cors配置
2. cookie配置
3. jwt配置
4. fileupload配置
5. typeorm配置
6. redis配置（如果项目缓存需求简单，可用keyv进行存储（内存，文件系统等））
7. 消息队列mq配置

### Module

一、`auth`模块

`auth.guard`进行权限守卫，解析`token`匹配用户
`auth.service`进行用户登录授权