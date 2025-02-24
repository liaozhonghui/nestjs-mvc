export function getClientIp(req: any, proxyType = 'nginx') {
  let ip =
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  // think.logger.debug(`clientIp1: ${req.connection.remoteAddress}`);
  // think.logger.debug(`clientIp2: ${req.socket.remoteAddress}`);
  // if (req.connection.socket) {
  //     think.logger.debug(`clientIp3: ${req.connection.socket.remoteAddress}`);
  // }
  // 如果使用了 nginx 代理
  if (proxyType === 'nginx') {
    // headers 上的信息容易被伪造,但是我不 care,自有办法过滤,例如 'x-nginx-proxy' 和 'x-real-ip'
    // 我在 nginx 配置里做了一层拦截把他们设置成了 'true' 和真实 ip,
    // 所以不用担心被伪造
    // 如果没用代理的话,我直接通过 req.connection.remoteAddress 获取到的也是真实 ip,所以我不 care
    // think.logger.debug(`Tale-Real-Ip: ${req.headers['tale-real-ip']}`);
    // think.logger.debug(`x-real-ip: ${req.headers['x-real-ip']}`);
    // think.logger.debug(`x-forwarded-for: ${req.headers['x-forwarded-for']}`);
    ip =
      req.headers['tale-real-ip'] ||
      req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for'] ||
      ip;
  }
  const ipArr = ip.split(',');
  const xffIp = req.headers['x-forwarded-for'];
  // if (xffIp) {
  //     const xffIpArr = xffIp.split(',');
  //     think.logger.debug(`clientIp6: ${xffIpArr}`);
  //     think.logger.debug(`clientIp7: ${xffIpArr[0]}`);
  // }
  // think.logger.debug(`clientIp8: ${ip}`);
  // 如果使用了nginx代理,如果没配置 'x-real-ip' 只配置了 'x-forwarded-for' 为 $proxy_add_x_forwarded_for,
  // 如果客户端也设置了 'x-forwarded-for' 进行伪造 ip
  // 则 req.headers['x-forwarded-for'] 的格式为 ip1,ip2 只有最后一个才是真实的 ip
  if (proxyType === 'nginx') {
    ip = ipArr[0];
  }
  if (ip.indexOf('::ffff:') !== -1) {
    ip = ip.substring(7);
  }
  // think.logger.debug(`clientIp9: ${ip}`);
  return ip;
}

export {};
