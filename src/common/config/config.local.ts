import * as path from 'path';
import defaultConfig from './config.default';

export default () => {
  return {
    ...defaultConfig,
    port: 7001,
    appKey: 'xxxxxx-local',
    jwt: {
      secret: 'xxxxxx',
      signOptions: { expiresIn: '2d' },
    },
    database: {
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'db',
      synchronize: false,
      logging: false,
      // 修改 entities 路径
      entities: [path.join(__dirname, '../../**/*.entity{.ts,.js}')],
    },
    bull: {
      redis: {
        host: '127.0.0.1',
        port: 6379,
        password: 'redis',
        db: 0,
      },
    },
    redis: {
      readyLog: true,
      config: {
        host: '127.0.0.1',
        port: 6379,
        password: 'redis',
        db: 0,
      },
    },
  };
};
