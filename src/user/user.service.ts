import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Equal, Repository } from 'typeorm';
import { isEmpty } from 'bullmq';
import { nanoidId } from 'src/common/utils/nanoid.util';
import { CustomError, ERROR_CODE } from 'src/common/errors/custom.error';
import { assign, each, isNil, omit, pick } from 'lodash';
import { dayjs } from 'src/common/utils/dayjs.util';
import { googleAccountIdTokenCheck } from './account/googleLogin.util';
import { UserRecordService } from './record/record.service';
import { clientVersionTransfer } from './record/client.util';

// This should be a real class/interface representing a user entity
@Injectable()
export class UserService {
  constructor(
    private readonly UserRecordService: UserRecordService,
    @InjectRepository(User)
    private userModel: Repository<User>,
  ) {}

  public async login(state: any, body: any) {
    const { device_id } = body;
    const timestamp = dayjs().unix();

    let inst = await this.userModel.findOne({
      where: {
        device_id: Equal(device_id),
      },
    });
    const { last_active_time, activedays, user_consecutive_active_days } =
      this.UserRecordService._calculateActiveDay(inst ?? ({} as any));
    const defaultProps = {
      register_time: timestamp,
      create_time: timestamp,
      simulator: body.simulator ?? false,
      install_time: body.install_time,
      first_ip: state.ip,
      first_ip_country_code: state.ip_country_code,
    };
    const updateProps = {
      ip: state.ip,
      ip_country_code: state.ip_country_code,
      login_time: timestamp,
      client_version_int: clientVersionTransfer(body.client_version),
      install_time: inst?.install_time ?? body.install_time,
      last_active_time,
      activedays,
      user_consecutive_active_days,
    };

    if (isEmpty(inst)) {
      const createObj = new User();
      Object.assign(createObj, body, {
        user_id: nanoidId(),
        index_id: device_id,
        ...defaultProps,
        ...updateProps,
      });
      const createRes = await this.userModel.save(createObj);
      inst = await this.userModel.findOne({
        where: { id: Equal(createRes.id) },
      });
    } else {
      Object.assign(inst, body, updateProps);
      await this.userModel.save(inst);
      inst = await this.userModel.findOne({
        where: { id: Equal(inst.id) },
      });
    }
    return this.userReturnBo(inst);
  }

  public async binding(user, body: any) {
    const device_id = user.device_id;
    if (body.google_account_type === 1) {
      // google账号新认证方法
      const { bind_id, email } = await googleAccountIdTokenCheck(
        body.bind_info.bind_id,
      );
      body.bind_info.bind_id = bind_id;
      body.bind_info.email = email;
    }
    const { first_name, last_name, email, bind_type, bind_id } = body.bind_info;
    body.bind_info = { first_name, last_name, email };

    let inst;
    const [bindInst, deviceIdInst] = await Promise.all([
      await this.userModel.findOne({
        where: {
          bind_type: Equal(bind_type),
          bind_id: Equal(bind_id),
        },
      }),
      await this.userModel.findOne({
        where: {
          device_id: Equal(device_id),
        },
      }),
    ]);
    if (!isEmpty(bindInst)) {
      inst = bindInst;
    } else {
      if (isEmpty(deviceIdInst)) {
        throw new CustomError(ERROR_CODE.USER_NOT_GENERATE, '用户未生成');
      } else if (deviceIdInst.bind_id) {
        throw new CustomError(ERROR_CODE.USER_HAS_BIND, '用户已绑定');
      } else {
        inst = deviceIdInst;
      }
    }
    const pickInfo: any = ['bind_info', 'nickname', 'avatar'].reduce(
      (tmp, key) => {
        tmp[key] = body[key] ?? null;
        return tmp;
      },
      {},
    );
    pickInfo.bind_id = bind_id;
    pickInfo.bind_type = bind_type;
    Object.assign(inst, pickInfo);
    const res = await this.userModel.save(inst);
    return this.userReturnBo(res);
  }

  public async getUserInfo(user_id) {
    const inst = await this.userModel.findOne({
      where: { user_id: Equal(user_id) },
    });
    return this.userReturnBo(inst);
  }

  public async updateUserInfo(user_id, body) {
    const utcOffset = await this.getUserTimezone(user_id);
    const today = dayjs().utcOffset(utcOffset);
    const inst = await this.userModel.findOne({
      where: { user_id: Equal(user_id) },
    });
    each(['language'], (key) => {
      if (!isNil(body[key])) inst[key] = body[key];
    });
    await this.userModel.save(inst);
    const userInst = await this.userModel.findOne({
      where: { id: Equal(inst.id) },
    });
    return this.userReturnBo(userInst);
  }

  public async userReturnBo(inst) {
    const props = ['user_id', 'language'];
    const bindInfo = {};
    if (inst.bind_id) {
      const { bind_info, bind_id, bind_type } = inst;
      assign(bindInfo, bind_info || {}, { bind_id, bind_type });
    }
    const res = {
      user_id: inst.user_id,
      ...pick(inst, props),
      bind_info: bindInfo,
      device: omit(inst, ['bind_id', 'bind_type', 'id'].concat(props)) as any,
    };
    return res;
  }

  public async getUserTimezone(user_id) {
    /**
     * FIXME: change to Redis
     */
    const inst = await this.userModel.findOne({
      where: {
        user_id: Equal(user_id),
      },
      select: ['time_zone'],
    });
    if (isEmpty(inst)) {
      throw new CustomError(500, `用户id对应的user_id不存在:${user_id}`);
    }
    const res = Number(inst.time_zone ?? 0) || 0;
    if (res > 16) {
      throw new CustomError(
        634,
        `该用户时区偏移应该是-14 ~ +12, 当前存储是：${inst.time_zone}`,
      );
    }
    return res;
  }

  public async deleteUser(user_id) {
    const inst = await this.userModel.findOne({
      where: { user_id: Equal(user_id) },
    });
    if (inst.is_deleted) {
      throw new CustomError(ERROR_CODE.USER_HAS_DELETED, '账号已注销');
    }
    /**
     * TODO: 校验是否有订阅
     */
    const updateData = {
      device_id: inst.device_id + '-deleted',
      is_deleted: true,
      delete_time: dayjs().unix(),
      bind_id: inst.bind_id ? inst.bind_id + '-deleted' : inst.bind_id,
      index_id: inst.device_id + '_' + inst.id,
    };
    await this.userModel.update(
      {
        user_id: Equal(user_id),
      },
      updateData,
    );
    return {};
  }
}
