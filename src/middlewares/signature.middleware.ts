import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SignatureMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: Function) {

        req.query.accessToken = null;
        if ( typeof req.headers.accesstoken !== 'undefined' ) {
            req.query.accessToken = req.headers.accesstoken;
        }
        next();
    }
}
