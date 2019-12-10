import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {Config} from '../config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SignatureMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: Function) {
    req.query.this = {};
    req.query.this.accessToken = null;
    if (typeof req.headers.authorization !== 'undefined') {
      req.query.this.accessToken = req.headers.authorization;

      let decoded = null;
      jwt.verify(req.query.this.accessToken, Config.jwt_key_access, (e, d) => {
        if (d != null) {
          decoded = d;
        }
      });

      req.query.this.userId = null;
      req.query.this.userRole = null;
      if (decoded !== null) {
        req.query.this.userId = decoded.userId;
        req.query.this.userRole = decoded.userRole;
      }
    }
    next();
  }

}
