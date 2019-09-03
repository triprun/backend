import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {Config} from '../config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SignatureMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: Function) {

    req.query.accessToken = null;
    if (typeof req.headers.accesstoken !== 'undefined') {
      req.query.accessToken = req.headers.accesstoken;

      let decoded = null;
      jwt.verify(req.query.accessToken, Config.jwt_key_access, (e, d) => {
        if (d != null) {
          decoded = d;
        }
      });

      req.query.userId = null;
      req.query.userRole = null;
      if (decoded !== null) {
        req.query.userId = decoded.userId;
        req.query.userRole = decoded.userRole;
      }
    }
    next();
  }

}
