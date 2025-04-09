# Nestjs-MVC

NestJS 后端模板，基于 Node.js 构建的基础框架，旨在提供快速开发的最佳实践。

---

## 基础配置

### 一、环境变量管理

支持多环境变量配置（如 `local`, `pre`, `prod`），如果需要测试环境，还可以扩展 `test` 或 `staging` 环境的配置。

- 默认配置文件：`config.default.ts`
- 环境配置文件：`config.[env].ts`

通过环境变量的灵活管理，确保开发、测试和生产环境的配置隔离。

---

### 二、业务错误码管理

框架支持自定义业务异常，通过定义业务错误码来规范化错误处理。

- 错误码定义文件：[custom.error.ts](./src/common/errors/custom.error.ts)

---

### 三、全局异常捕获器

框架内置全局异常捕获机制，用于捕获应用中所有未处理的异常。对于 Web 应用，异常会以统一的错误格式返回。

- 全局异常捕获器：[exception.filter.ts](./src/common/filters/exception.filter.ts)

---

### 四、接口返回格式

所有接口统一采用标准化的 `JSON` 返回格式，包含以下字段：

- `code`：状态码
- `msg`：提示信息
- `data`：返回数据

- 数据传输对象定义：[response.dto.ts](./src/common/dto/response.dto.ts)

---

### 五、响应中间件

框架提供了响应中间件，用于增强接口的响应能力，具体功能包括：

1. 拦截非法路由请求，返回 `403 Forbidden`。
2. 设置 `async_hooks`，实现链路追踪功能。
3. 统计接口响应耗时，并通过 `x-response-time` 响应头返回。

---

### 六、`Client IP` 中间件

通过中间件获取请求客户端的 IP 地址，并支持以下功能：

1. 获取 IP 对应的国家代码（基于二分查找实现 IP 查询）。
2. 实现 IP 限流功能（也可通过云服务商提供的防护机制实现）。

---

### 七、请求体加解密

设计并实现了一个 `JSON` 加解密算法，用于保护请求数据的安全性，防止敏感信息泄露。

---

### 八、其他配置项

框架还提供了以下常用功能的配置支持：

1. **CORS 配置**：支持跨域请求。
2. **Cookie 配置**：便捷的 Cookie 管理。
3. **JWT 配置**：用于用户认证的 Token 管理。
4. **文件上传配置**：支持文件上传功能。
5. **TypeORM 配置**：数据库 ORM 支持。
6. **Redis 配置**：支持缓存功能（如果项目缓存需求简单，可使用 `keyv` 进行存储，支持内存、文件系统等多种存储方式）。
7. **消息队列配置**：支持消息队列（MQ）功能。

---



## 快速开始

1. 克隆项目到本地：
```bash
git clone https://github.com/your-repo/nestjs-mvc.git
```

2. 使用`docker-compose`启动本地`pg`和`redis`
```bash
docker-compose up -d
```

3. 修改`config.local`文件中的连接配置

4. 测试发送请求:
```bash
curl --location --request POST 'http://localhost:7001/login' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: localhost:7001' \
--header 'Connection: keep-alive' \
--data-raw '{"android_id":"6ea1c5df5fe010ff","app_id":"com.ai.nutrition.calorie.tracker","carrier":"","chid":null,"client_version":"1.0.5","current_language":null,"device_brand":"samsung","device_id":"6ea1c5df5fe010ff","device_model":"SM-A516B","email":null,"first_name":null,"ga_id":"c28399e7-aab2-4d75-b3fe-9a76c7be4e9c","imei":"","install_time":"1740056422","last_name":null,"launch_num":null,"mac":null,"mchid":null,"origin_language":"de_DE","os":"android","os_version":"12","simulator":false,"time_zone":"8","login_status":null}'
```