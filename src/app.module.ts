import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ResponseMiddleware } from './common/middleware/response.middleware';
import { IpMiddleware } from './common/middleware/ip.middleware';

const configFileName = {
  local: 'config.local',
  pre: 'config.pre',
  prod: 'config.prod',
  production: 'config.prod',
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        require(
          path.resolve(
            __dirname,
            `common/config/${configFileName[process.env.NODE_ENV || 'local']}`,
          ),
        ).default,
      ],
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
      global: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule], // 依赖 ConfigService 模块
      useFactory: async (configService: ConfigService) => {
        const jwtConfig = configService.get('jwt');
        return jwtConfig;
      },
      inject: [ConfigService], // 注入 ConfigService
      global: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get('redis');
        return redisConfig;
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get('database');
        return config;
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const bullConfig = configService.get('bull');
        return { connection: bullConfig.redis };
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware, IpMiddleware).forRoutes('*');
  }
}
