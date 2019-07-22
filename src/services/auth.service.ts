import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Users } from '../models/users.model';
import { Consts } from '../consts';
import { Passwords } from '../models/passwords.model';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import {Config} from '../config';
import moment = require('moment');
import { RedisService } from 'nestjs-redis';
import {
    AuthPostMailInterface,
    AuthResponsePostMailInterface,
    AuthPostLogoutInterface,
    AuthPostRefreshInterface,
    AuthPostAccessInterface,
} from '../interfaces/protocol';

@Injectable()
export class AuthService {

    @Inject(Consts.users_rep) private readonly TUsers: typeof Users;
    @Inject(Consts.passwords_rep) private readonly TPasswords: typeof Passwords;

    constructor(
        private readonly redisService: RedisService,
    ) { }

    async clearTokensIsRedis(userId: number): Promise<void> {
        const redis = await this.redisService.getClient();
        const set = await redis.smembers('user:' + userId + ':tokens');
        const remove = [];
        for ( let d of set) {
            d = JSON.parse(d);
            if ( d.refreshTokenExpireAt < moment().unix() ) {
                remove.push(JSON.stringify(d));
            }
        }
        if ( remove.length ) {
            await redis.srem('user:' + userId + ':tokens', remove);
        }
        return;
    }

    async checkRefreshToken(token): Promise<boolean> {

        let decoded = null;
        jwt.verify(token, Config.jwt_key_refresh, (e, d) => {
            if ( d != null ) {
                decoded = d;
            }
        });

        if ( decoded == null ) {
            return false;
        }

        if ( decoded.expireAt < moment().unix() ) {
            await this.clearTokensIsRedis( decoded.userId );
            return false;
        }

        const redis = await this.redisService.getClient();
        const set = await redis.smembers('user:' + decoded.userId + ':tokens');
        let b = false;
        for ( let d of set) {
            d = JSON.parse(d);
            if ( d.refreshToken === decoded.token ) {
                b = true;
                break;
            }
        }
        if ( b ) {
            return true;
        }
        await this.clearTokensIsRedis( decoded.userId );
        return false;
    }

    async checkAccessToken(token): Promise<boolean> {

        let decoded = null;
        jwt.verify(token, Config.jwt_key_access, (e, d) => {
            if ( d != null ) {
                decoded = d;
            }
        });

        if ( decoded == null ) {
            return false;
        }

        if ( decoded.expireAt < moment().unix() ) {
            return false;
        }

        const redis = await this.redisService.getClient();
        const set = await redis.smembers('user:' + decoded.userId + ':tokens');

        let b = false;
        for ( let d of set) {
            d = JSON.parse(d);
            if ( d.accessToken === decoded.token ) {
                b = true;
                break;
            }
        }
        if ( b ) {
            return true;
        }

        return false;
    }

    async generateTokens(uid: number): Promise<AuthResponsePostMailInterface> {

        const user = await this.TUsers.findOne({
            where: {
                id: uid,
            },
        });

        if ( user == null ) {
            throw new HttpException('auth.service:generateTokens:0', 500);
        }

        const dataAccess = {
            userId: user.id,
            expireAt: moment().unix() + Config.access_token_expire_at,
            token: crypto.createHash('sha256').update(
                Config.salt_sha_access + moment() + moment().unix() + user.id + Math.random()
            ).digest('hex'),
        };

        const accessTokenJwt = jwt.sign(dataAccess, Config.jwt_key_access);

        const dataRefresh = {
            userId: user.id,
            expireAt: moment().unix() + Config.refresh_token_expire_at,
            token: crypto.createHash('sha256').update(
                Config.salt_sha_refresh + moment() + moment().unix() + user.id + Math.random()
            ).digest('hex'),
        };

        const refreshTokenJwt = jwt.sign(dataRefresh, Config.jwt_key_refresh);

        await this.clearTokensIsRedis( user.id );

        return {
            accessToken: accessTokenJwt,
            refreshToken: refreshTokenJwt,
            accessTokenExpireAt: dataAccess.expireAt,
            refreshTokenExpireAt: dataRefresh.expireAt,
        };

    }

    async access(body: AuthPostAccessInterface): Promise<object> {
        if ( await this.checkAccessToken( body.accessToken ) === false ) {
            throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
        }
        return {};
    }

    async logout(body: AuthPostLogoutInterface): Promise<object> {

        if ( await this.checkAccessToken( body.accessToken ) === false ) {
            throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
        }

        let decoded = null;
        jwt.verify(body.accessToken, Config.jwt_key_access, (e, d) => {
            if ( d != null ) {
                decoded = d;
            }
        });

        const redis = await this.redisService.getClient();
        const set = await redis.smembers('user:' + decoded.userId + ':tokens');
        const remove = [];
        for ( let d of set) {
            d = JSON.parse(d);
            if ( d.accessToken === decoded.token ) {
                remove.push(JSON.stringify(d));
            }
        }
        if ( remove.length ) {
            await redis.srem('user:' + decoded.userId + ':tokens', remove);
            return {};
        }

        throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }

    async mail(body: AuthPostMailInterface): Promise<AuthResponsePostMailInterface> {

        if ( body.email == null ) {
            throw new HttpException(Consts.ERROR_MAIL_PASSWORD, 400);
        }

        const user = await this.TUsers.findOne({
            where: {
                email: body.email,
            },
        });
        if ( user == null ) {
            throw new HttpException(Consts.ERROR_MAIL_PASSWORD, 400);
        }

        const password = await this.TPasswords.findOne({
            where: {
                userId: user.id,
                isActive: 1,
                password: crypto.createHash('sha256').update(body.password + Config.salt_sha).digest('hex'),
            },
        });

        if ( password == null ) {
            throw new HttpException(Consts.ERROR_MAIL_PASSWORD, 400);
        }

        if ( password.isActive === 0 ) {
            throw new HttpException(Consts.ERROR_PASSWORD_NOT_ACTIVE, 400);
        }

        /* пароль подошел */
        const res = await this.generateTokens(user.id);

        let dataAccess = null;
        jwt.verify(res.accessToken, Config.jwt_key_access, (e, d) => {
            if ( d != null ) {
                dataAccess = d;
            }
        });

        let dataRefresh = null;
        jwt.verify(res.refreshToken, Config.jwt_key_refresh, (e, d) => {
            if ( d != null ) {
                dataRefresh = d;
            }
        });

        const redis = await this.redisService.getClient();

        const str = JSON.stringify({
            accessToken: dataAccess.token,
            refreshToken: dataRefresh.token,
            refreshTokenExpireAt: dataRefresh.expireAt,
        });

        redis.sadd('user:' + user.id + ':tokens', str);

        return res;
    }

    async refresh(body: AuthPostRefreshInterface): Promise<AuthResponsePostMailInterface> {

        if ( await this.checkRefreshToken( body.refreshToken ) === false ) {
            throw new HttpException(Consts.ERROR_REFRESH_TOKEN, 401);
        }

        let decoded = null;
        jwt.verify(body.refreshToken, Config.jwt_key_refresh, (e, d) => {
            if ( d != null ) {
                decoded = d;
            }
        });

        const res = await this.generateTokens(decoded.userId);

        const redis = await this.redisService.getClient();
        const set = await redis.smembers('user:' + decoded.userId + ':tokens');

        const remove = [];
        for ( let d of set) {
            d = JSON.parse(d);
            if ( d.refreshToken === decoded.token ) {
                remove.push(JSON.stringify(d));
            }
        }
        if ( remove.length ) {
            await redis.srem('user:' + decoded.userId + ':tokens', remove);
        }

        let dataAccess = null;
        jwt.verify(res.accessToken, Config.jwt_key_access, (e, d) => {
            if ( d != null ) {
                dataAccess = d;
            }
        });

        let dataRefresh = null;
        jwt.verify(res.refreshToken, Config.jwt_key_refresh, (e, d) => {
            if ( d != null ) {
                dataRefresh = d;
            }
        });

        const str = JSON.stringify({
            accessToken: dataAccess.token,
            refreshToken: dataRefresh.token,
            refreshTokenExpireAt: dataRefresh.expireAt,
        });

        redis.sadd('user:' + decoded.userId + ':tokens', str);

        return res;
    }

}
