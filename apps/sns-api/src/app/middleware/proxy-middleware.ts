import { NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class ProxyMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: 'https://api.pinterest.com/v5',
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const end = path.indexOf('/', '/api/'.length);
      return path.substr(end);
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `[ProxyMiddleware]: ${req.originalUrl} -> ${req.url} - ${req.method}`
      );
    },
  });

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
