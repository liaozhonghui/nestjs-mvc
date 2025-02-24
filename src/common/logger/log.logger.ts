import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLogger implements LoggerService {
  get timePrefix() {
    if (process.env.NODE_ENV === 'local') {
      return new Date().toISOString() + ' ';
    } else {
      return '';
    }
  }
  public log(req: any, ...messages) {
    const message = messages.join(' ');
    const ip = req?.state?.ip || 'no';
    const ip_country_code = req?.state?.ip_country_code || 'no';
    const userId = req?.user?.user_id || 'no';
    const deviceId = req?.user?.device_id || 'no';
    const sessionId = req?.id || 'no';
    console.info(
      `${this.timePrefix}[INFO] [${ip}|${ip_country_code}][${sessionId}]|[${userId}|${deviceId}][${req.originalUrl}] ${message.slice(0, 1000)}`,
    );
  }
  public error(req: any, ...messages) {
    const message = messages.join(' ');
    const ip = req?.state?.ip || 'no';
    const ip_country_code = req?.state?.ip_country_code || 'no';
    const userId = req?.user?.user_id || 'no';
    const deviceId = req?.user?.device_id || 'no';
    const sessionId = req?.id || 'no';
    console.error(
      `${this.timePrefix}[ERROR] [${ip}|${ip_country_code}][${sessionId}]|[${userId}|${deviceId}][${req.originalUrl}] ${message}`,
    );
  }
  public warn(req: any, ...messages) {
    const message = messages.join(' ');
    const ip = req?.state?.ip || 'no';
    const ip_country_code = req?.state?.ip_country_code || 'no';
    const userId = req?.user?.user_id || 'no';
    const deviceId = req?.user?.device_id || 'no';
    const sessionId = req?.id || 'no';
    console.warn(
      `${this.timePrefix}[WARN] [${ip}|${ip_country_code}][${sessionId}]|[${userId}|${deviceId}][${req.originalUrl}] ${message}`,
    );
  }

  public debug(req: any, ...messages) {
    const message = messages.join(' ');
    const ip = req?.state?.ip || 'no';
    const ip_country_code = req?.state?.ip_country_code || 'no';
    const userId = req?.user?.user_id || 'no';
    const deviceId = req?.user?.device_id || 'no';
    const sessionId = req?.id || 'no';
    console.debug(
      `${this.timePrefix}[DEBUG] [${ip}|${ip_country_code}][${sessionId}]|[${userId}|${deviceId}][${req.originalUrl}] ${message}`,
    );
  }

  public verbose(req: any, ...messages) {
    const message = messages.join(' ');
    const ip = req?.state?.ip || 'no';
    const ip_country_code = req?.state?.ip_country_code || 'no';
    const userId = req?.user?.user_id || 'no';
    const deviceId = req?.user?.device_id || 'no';
    const sessionId = req?.id || 'no';
    console.log(
      `[VERBOSE] [${ip}|${ip_country_code}][${sessionId}]|[${userId}|${deviceId}][${req.originalUrl}] ${message}`,
    );
  }
}
