import {Injectable, Inject, HttpException} from '@nestjs/common';
import {Users} from '../models/users.model';
import {Consts} from '../consts';
import {Passwords} from '../models/passwords.model';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import {Config} from '../config';
import moment = require('moment');
import {RedisService} from 'nestjs-redis';
import {
  UserPostRegistrationDto,
  UserPostRegistrationResponse,
  UserGetProfileDto,
  UserGetProfileResponse,
  AuthPostMailDto,
  UserPostPasswordDto,
  AuthGetLogoutDto,
  AuthPostAccessDto,
  AuthPostRefreshDto,
} from '../protocol';

import {AuthService} from './auth.service';

@Injectable()
export class UserService {

  @Inject(Consts.users_rep) private readonly TUsers: typeof Users;
  @Inject(Consts.passwords_rep) private readonly TPasswords: typeof Passwords;

  constructor(
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
  ) {
  }

  async register(body: UserPostRegistrationDto, query): Promise<any> {

    if (body.email == null) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
    }

    if (body.firstName == null) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
    }

    if (body.lastName == null) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
    }

    if (body.password == null) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
    }

    if (/^.*?@\w+\.\w{2,5}$/.test(body.email) === false) {
      throw new HttpException(Consts.ERROR_MAIL_NOT_VALID, 400);
    }

    let user = null;

    if (body.userName != null) {

      user = await this.TUsers.findOne({
        where: {
          userName: body.userName,
        },
      });

      if (user != null) {
        throw new HttpException(Consts.ERROR_USERNAME, 400);
      }
    }

    user = await this.TUsers.findOne({
      where: {
        email: body.email,
      },
    });

    if (user != null) {
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

    return {
      userId: user.id,
    };

  }

  async login(body: AuthPostMailDto): Promise<any> {

    const res = await this.authService.mail({
      email: body.email,
      password: body.password,
    });

    const profile = await this.profile({
      userName: null,
      accessToken: res.accessToken,
      userId: null,
    });

    return {
      ...res,
      profile,
    };
  }

  async logout(query: AuthGetLogoutDto): Promise<any> {

    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    await this.authService.logout(query);

    return {};
  }

  async password(body: UserPostPasswordDto, query): Promise<any> {

    if (body.newPassword == null) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
    }

    if (body.oldPassword == null) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
    }

    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }

    let decoded = null;
    jwt.verify(query.accessToken, Config.jwt_key_access, (e, d) => {
      if (d != null) {
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

    if (password == null) {
      throw new HttpException(Consts.ERROR_PASSWORD, 400);
    }

    const pass2 = crypto.createHash('sha256').update(body.newPassword + Config.salt_sha).digest('hex');

    const password2 = await this.TPasswords.findOne({
      where: {
        userId: decoded.userId,
        password: pass2,
      },
    });

    if (password2 != null) {
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

    const user = await this.profile(query);
    await this.logout(query);
    const res = await this.login({
      email: user.email,
      password: body.newPassword,
    });

    return res;
  }

  async setRole(body, query): Promise<any> {

    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const user = await this.profile({accessToken: query.accessToken});
    if (user.role === 0) {
      throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
    }

    if ( body.role < 0 || body.role > 2 ) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
    }

    await this.TUsers.update({
      role: body.role,
    }, {
      where: {
        id: body.userId,
      },
    });

    return {};
  }

  async profiles(query): Promise<any> {
    const arr = query.ids.split(',')
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      const tmp = {
        userId: arr[i],
        userName: null,
        accessToken: null,
      };
      res.push(await this.profile(tmp));
    }
    return res;
  }

  async profile(query): Promise<any> {

    if (query.userId == null && query.userName == null && query.accessToken == null) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 400);
    }

    let userId = query.userId;
    let decoded = null;

    if (query.userId == null && query.userName == null) {

      if (await this.authService.checkAccessToken(query.accessToken) === false) {
        throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
      }

      jwt.verify(query.accessToken, Config.jwt_key_access, (e, d) => {
        if (d != null) {
          decoded = d;
        }
      });

      userId = decoded.userId;
    }

    if (query.userId == null) {

      if (query.userName != null) {

        const userTmp = await this.TUsers.findOne({
          where: {
            userName: query.userName,
          },
        });
        if (userTmp != null) {
          userId = userTmp.id;
        }

      }

    }

    if (userId == null) {
      throw new HttpException(Consts.ERROR_USER_NOT_FOUND, 400);
    }

    const user = await this.TUsers.findOne({
      where: {
        id: userId,
      },
    });
    if (user == null) {
      throw new HttpException(Consts.ERROR_USER_NOT_FOUND, 400);
    }

    return {
      id: user.id,
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
      verified: user.verified,
      bio: user.bio,
      avatar: user.avatar,
      joined: user.createdAt,
      origin: user.origin,
      role: user.role,
    };

  }

  async access(body: AuthPostAccessDto, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    return {};
  }

  async refresh(body: AuthPostRefreshDto): Promise<any> {

    return await this.authService.refresh(body);

  }

}
