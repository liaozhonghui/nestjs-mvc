import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { MyService } from './my.service';
import { createResponse } from 'src/common/utils/response.util';

/**
 * 模块：我的
 * 功能：用户信息相关
 * 作者：LiaoXin
 * 日期：xxxx-xx-xx
 * 描述：该模块包含用户信息的获取、更新和删除功能。
 */
@Controller('/api/my')
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Post('/getUserInfo')
  @HttpCode(HttpStatus.OK)
  public async getUserInfo(@Request() req) {
    const user = req['user'];
    const res = await this.myService.getUserInfo(user);
    return createResponse(res); // 使用统一格式返回
  }

  @Post('/updateUserInfo')
  @HttpCode(HttpStatus.OK)
  public async updateUserInfo(@Request() req, @Body() body: any) {
    const user = req['user'];
    const res = await this.myService.updateUserInfo(user, body);
    return createResponse(res); // 使用统一格式返回
  }

  @Post('/deleteUser')
  @HttpCode(HttpStatus.OK)
  public async deleteUser(@Request() req) {
    const user = req['user'];
    const res = await this.myService.deleteUser(user);
    return createResponse(res); // 使用统一格式返回
  }
}
