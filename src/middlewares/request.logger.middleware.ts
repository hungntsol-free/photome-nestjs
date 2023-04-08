import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '@providers/logger';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { method, originalUrl, ip } = req;
      const { statusCode, statusMessage } = res;
      const userAgent = req.get('user-agent') || '';
      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} -- ${userAgent} ${ip}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      } else if (statusCode >= 400) {
        return this.logger.warn(message);
      }
      return this.logger.log(message);
    });

    next();
  }
}
