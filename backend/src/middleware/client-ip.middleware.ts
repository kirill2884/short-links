import { Injectable, NestMiddleware } from '@nestjs/common';
import * as requestIp from 'request-ip';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ClientIpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    requestIp.mw()(req, res, () => {
      next();
    });
  }
}