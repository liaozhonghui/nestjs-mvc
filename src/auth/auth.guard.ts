import {
  CanActivate,
  ExecutionContext,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from 'src/common/logger/log.logger';
import { UserRecordService } from 'src/user/record/record.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger: LoggerService = new CustomLogger();
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
    private UserRecordService: UserRecordService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token =
      this.extractTokenFromCookie(request) ||
      this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const configJwt: any = this.configService.get<string>('jwt');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configJwt.secret,
      } as JwtVerifyOptions);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      const existed = await this.UserRecordService.guardUpdateUser(
        request,
        payload.user_id,
      );
      if (!existed) {
        throw new UnauthorizedException();
      }
      this.logger.log(request, JSON.stringify(request.body || {}));
    } catch (e) {
      this.logger.error(request, e.message);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(request: any) {
    return request.cookies?.['auth'] as string; // 假设 cookie 中的 token 名为 'auth'
  }
}
