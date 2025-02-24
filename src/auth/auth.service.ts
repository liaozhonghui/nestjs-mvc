import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(state, body) {
    const res = await this.userService.login(state, body);
    const device_id = res.device.device_id;
    const user_id = res.user_id;
    const payload = { device_id, platform: body.os, sub: user_id, user_id };
    const access_token = await this.jwtService.signAsync(payload);
    return Object.assign(res, { access_token });
  }
  public async binding(user, body) {
    const res = await this.userService.binding(user, body);
    const device_id = res.device.device_id;
    const user_id = res.user_id;
    const payload = {
      device_id,
      platform: res.device.os,
      sub: user_id,
      user_id,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return Object.assign(res, { access_token });
  }
}
