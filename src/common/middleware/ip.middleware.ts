import { Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import { getClientIp } from '../utils/ip.util';
// import ipdb from 'ipdb';

// const ipService = ipdb.getIPHelper();
type ReqState = { [key: string]: any };
declare module 'node:http' {
  interface IncomingMessage {
    state: ReqState;
  }
}
@Injectable()
export class IpMiddleware implements NestMiddleware {
  use(req: any, res: any, next: any) {
    const ip: string = getClientIp(req); // 获取用户的 IP
    req.state = {} as ReqState;
    req.state.ip = ip;
    // req.state.ip_country_code = ipService.getCountryCodeByIpV1(ip);

    next();
  }
}
