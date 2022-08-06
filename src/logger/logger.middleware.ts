import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const reqLog = `[Request] ${req.ip} ${req.url} ${
        req.method
      } ${JSON.stringify(req.body)} `;
      const resLog = `[Response] ${res.statusCode} ${JSON.stringify(
        res.statusMessage,
      )}`;
      if (res.statusCode >= 200 && res.statusCode < 300) {
        this.logger.log(reqLog + resLog);
      }
      if (res.statusCode >= 500) {
        this.logger.error(reqLog + resLog);
      }
      if (res.statusCode >= 400 && res.statusCode < 500) {
        this.logger.warn(reqLog + resLog);
      }
    });
    next();
  }
}
