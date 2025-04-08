import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MyService {
  constructor(private userService: UserService) {}

  public async getUserInfo({ user_id }) {
    const userInfo = await this.userService.getUserInfo(user_id);
    return userInfo;
  }

  public async updateUserInfo({ user_id }, body) {
    const userInfo = await this.userService.updateUserInfo(user_id, body);
    return userInfo;
  }

  public async deleteUser({ user_id }) {
    const userInfo = await this.userService.deleteUser(user_id);
    return userInfo;
  }
}
