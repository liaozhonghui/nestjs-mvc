import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto'; // 引入统一响应格式
import { CustomLogger } from '../logger/log.logger';
import { Request, Response } from 'express';

@Catch(Error, HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: CustomLogger = new CustomLogger();

  public catch(exception: HttpException | Error, host: ArgumentsHost) {
    const reply = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    const message = exception.message || '服务器内部错误';

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      // 返回统一格式的错误信息;
      const resJson = new ResponseDto(status, message, {});
      this.logger.error(request, JSON.stringify(resJson));
      reply.status(HttpStatus.OK).send(resJson);
    } else {
      const resJson = new ResponseDto(500, `服务器异常: ${message}`, {});
      this.logger.error(request, JSON.stringify(resJson));
      reply.status(HttpStatus.OK).send(resJson);
    }
  }
}
