import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  LoggerService,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { CustomLogger } from 'src/common/logger/log.logger';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { AuthPublic } from './auth.decorator';
import { createResponse } from 'src/common/utils/response.util';

@Controller()
export class AuthController {
  private logger: LoggerService = new CustomLogger();
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @AuthPublic()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public async login(
    @Request() req,
    @Body() body: Record<string, any>,
    @Res({ passthrough: true }) response,
  ) {
    const state = req.state;
    const res = await this.authService.login(state, body);
    response.cookie('auth', res.access_token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    req['user'] = Object.assign({ device_id: body.device_id }, res);
    this.logger.log(req, JSON.stringify(body));
    return createResponse(res);
  }

  @Post('/binding')
  @HttpCode(HttpStatus.OK)
  public async binding(
    @Request() req,
    @Body() body: Record<string, any>,
    @Res({ passthrough: true }) response,
  ) {
    const user = req['user'];
    const res = await this.authService.binding(user, body);
    response.cookie('auth', res.access_token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    this.logger.log(req, JSON.stringify(body));
    return createResponse(res); // 使用统一格式返回
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Request() req,
    @Body() body: Record<string, any>,
    @Res({ passthrough: true }) response,
  ) {
    const user = req['user'];
    const res = await this.authService.binding(user, body);
    response.cookie('auth', res.access_token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    this.logger.log(req, JSON.stringify(body));
    return createResponse(res); // 使用统一格式返回
  }
}
