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
    UserPostRegistrationInterface,
    UserPostPasswordInterface,
    UserGetProfileInterface,
    UserResponseGetProfileInterface,
} from '../interfaces/protocol';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

    @Inject(Consts.users_rep) private readonly TUsers: typeof Users;
    @Inject(Consts.passwords_rep) private readonly TPasswords: typeof Passwords;

    constructor(
        private readonly redisService: RedisService,
        private readonly authService: AuthService,
    ) { }

    async register(body: UserPostRegistrationInterface): Promise<object> {

        if ( body.email == null ) {
            throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
        }

        if ( body.firstName == null ) {
            throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
        }

        if ( body.lastName == null ) {
            throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
        }

        if ( body.password == null ) {
            throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
        }

        if ( /^.*?@\w+\.\w{2,5}$/.test(body.email) === false ) {
            throw new HttpException(Consts.ERROR_MAIL_NOT_VALID, 400);
        }

        let user = null;

        if ( body.userName != null ) {

            user = await this.TUsers.findOne({
                where: {
                    userName: body.userName,
                },
            });

            if ( user != null ) {
                throw new HttpException(Consts.ERROR_USERNAME, 400);
            }
        }

        user = await this.TUsers.findOne({
            where: {
                email: body.email,
            },
        });

        if ( user != null ) {
            throw new HttpException(Consts.ERROR_MAIL, 400);
        }

        user = await this.TUsers.create({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            userName: body.userName,
        });

        const pass = crypto.createHash('sha256').update(body.password + Config.salt_sha).digest('hex');

        await this.TPasswords.create({
           userId: user.id,
           password: pass,
           isActive: 1,
        });

        const res = await this.authService.mail({
            email: body.email,
            password: body.password,
        });

        return res;

    }

    async login(body: UserPostRegistrationInterface): Promise<object> {
      const res = await this.authService.mail({
          email: body.email,
          password: body.password,
      });

      const profile = await this.profile({ accessToken: res.accessToken });

      return {
        ...res,
        profile
      };
    }

    async password(body: UserPostPasswordInterface): Promise<object> {

        if ( body.newPassword == null ) {
            throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
        }

        if ( body.oldPassword == null ) {
            throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
        }

        if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
            throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
        }

        let decoded = null;
        jwt.verify(body.accessToken, Config.jwt_key_access, (e, d) => {
            if ( d != null ) {
                decoded = d;
            }
        });

        const pass = crypto.createHash('sha256').update(body.oldPassword + Config.salt_sha).digest('hex');

        const password = await this.TPasswords.findOne({
            where: {
                userId: decoded.userId,
                isActive: 1,
                password: pass,
            },
        });

        if ( password == null ) {
            throw new HttpException(Consts.ERROR_PASSWORD, 400);
        }

        const pass2 = crypto.createHash('sha256').update(body.newPassword + Config.salt_sha).digest('hex');

        const password2 = await this.TPasswords.findOne({
            where: {
                userId: decoded.userId,
                password: pass2,
            },
        });

        if ( password2 != null ) {
            throw new HttpException(Consts.ERROR_PASSWORD_DISCREDIT, 400);
        }

        await this.TPasswords.update({
            isActive: 0,
        }, {
            where: {
                id: password.id,
            },
        });

        await this.TPasswords.create({
            userId: decoded.userId,
            password: pass2,
            isActive: 1,
        });

        return {};
    }

    async profile(body: UserGetProfileInterface): Promise<UserResponseGetProfileInterface> {

        if ( body.userId == null && body.userName == null && body.accessToken == null ) {
            throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
        }

        let userId = body.userId;
        let decoded = null;

        if ( body.userId == null && body.userName == null ) {

            if ( await this.authService.checkAccessToken( body.accessToken ) === false ) {
                throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
            }

            jwt.verify(body.accessToken, Config.jwt_key_access, (e, d) => {
                if ( d != null ) {
                    decoded = d;
                }
            });

            userId = decoded.userId;
        }

        if ( body.userId == null ) {

            if ( body.userName != null ) {

                const userTmp = await this.TUsers.findOne({
                    where: {
                        userName: body.userName,
                    },
                });
                if (userTmp != null) {
                    userId = userTmp.id;
                }

            }

        }

        if ( userId == null ) {
            throw new HttpException(Consts.ERROR_USER_NOT_FOUND, 400);
        }

        const user = await this.TUsers.findOne({
            where: {
                id: userId,
            },
        });
        if ( user == null ) {
            throw new HttpException(Consts.ERROR_USER_NOT_FOUND, 400);
        }

        return {
            id: user.id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            sex: user.sex,
            verified: user.verified,
        };

    }

}
