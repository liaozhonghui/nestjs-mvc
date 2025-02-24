import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.COOKIE_SECRET || 'default_secret'));
  const logger = new Logger();
  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // 启用CORS
  app.enableCors({
    allowedHeaders: '*',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    origin: '*',
    credentials: false,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port', 3000); // 默认3000

  await app.listen(port, '0.0.0.0');

  logger.log('Server running at http://localhost:' + port);
}
bootstrap();
