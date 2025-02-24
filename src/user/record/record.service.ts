import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { isEmpty, isNil } from 'lodash';

@Injectable()
export class UserRecordService {
  constructor(
    @InjectRepository(User)
    private userModel: Repository<User>,
  ) {}

  public _calculateActiveDay(userInfo: {
    last_active_time: number;
    activedays: number;
    user_consecutive_active_days: number;
  }) {
    if (isNil(userInfo.last_active_time)) userInfo.last_active_time = 0;
    if (isNil(userInfo.activedays)) userInfo.activedays = 0;
    if (isNil(userInfo.user_consecutive_active_days))
      userInfo.user_consecutive_active_days = 0;
    const today = new Date();
    const last_active_time = Number(
      today.toISOString().slice(0, 10).replace(/-/g, ''),
    );
    if (last_active_time > userInfo.last_active_time) {
      const activedays = userInfo.activedays > 0 ? userInfo.activedays + 1 : 1;
      const gettime = (t) => {
        const strT = String(t);
        const dateStrT =
          strT.slice(0, 4) + '-' + strT.slice(4, 6) + '-' + strT.slice(-2);
        return new Date(dateStrT).getTime();
      };
      const TWO_DAY = 2 * 24 * 3600 * 1000;
      const duration = today.getTime() - gettime(userInfo.last_active_time);

      let user_consecutive_active_days = 1;
      if (duration < TWO_DAY) {
        user_consecutive_active_days =
          Number(userInfo.user_consecutive_active_days ?? 0) + 1;
      }
      return {
        last_active_time,
        activedays,
        user_consecutive_active_days,
      };
    } else {
      return {
        last_active_time: userInfo.last_active_time,
        activedays: userInfo.activedays,
        user_consecutive_active_days: userInfo.user_consecutive_active_days,
      };
    }
  }
  private async checkUserExists(userInfo) {
    if (isEmpty(userInfo) || userInfo.is_deleted) {
      return false;
    }
    return true;
  }
  private async updateUserOnEveryVisited(userInfo) {
    return await this.userModel.update(
      { id: userInfo.id },
      {
        last_active_time: userInfo.last_active_time,
        activedays: userInfo.activedays,
        user_consecutive_active_days: userInfo.user_consecutive_active_days,
      },
    );
  }
  public async guardUpdateUser(req, user_id) {
    const userInfo = await this.userModel.findOne({
      where: { user_id: Equal(user_id) },
      select: [
        'id',
        'user_id',
        'is_deleted',
        'last_active_time',
        'activedays',
        'user_consecutive_active_days',
      ],
    });
    const valid = await this.checkUserExists(userInfo);
    if (!valid) return false;
    const { last_active_time, activedays, user_consecutive_active_days } =
      this._calculateActiveDay(userInfo);
    Object.assign(userInfo, {
      last_active_time,
      activedays,
      user_consecutive_active_days,
    });
    Object.assign(req.state, {
      last_active_time,
      activedays,
      user_consecutive_active_days,
    });
    await this.updateUserOnEveryVisited(userInfo);
    return true;
  }
}
