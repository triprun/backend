import { Injectable, Inject, HttpException} from '@nestjs/common';
import { Model } from 'mongoose';
import { Consts } from '../consts';
import { RedisService } from 'nestjs-redis';
import { UserService } from './user.service';
import { IMarschroute } from '../schemas/marschroute.interface';
import moment = require('moment');

import {AuthService} from './auth.service';

@Injectable()
export class MarschrouteService {

  constructor(
    @Inject(Consts.marschroute_rep)
    private readonly marschrouteModel: Model<IMarschroute>,
    @Inject(Consts.marschroutesnap_rep)
    private readonly marschrouteSnapModel: Model<IMarschroute>,
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  async createSnap(res) {
    const snap = JSON.parse(JSON.stringify(res));
    delete snap._id;
    delete snap.id;
    snap.ref = res._id;
    snap.created_at = moment().unix();
    const commonSnap = new this.marschrouteSnapModel(snap);
    await commonSnap.save();
  }

  async create(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const user = await this.userService.profile({accessToken: query.accessToken});
    if (user.role === 0) {
      throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
    }

    const common = new this.marschrouteModel({...body, created_at: moment().unix()});
    common.id = common._id;
    common.author = Number(user.id);
    const res = await common.save();

    this.createSnap(res);

    return res;
  }

  async findById(id, query): Promise<any> {
    const mroute = await this.marschrouteModel.findById(id).exec();
    if ( mroute.type !== 0 ) {
      return mroute;
    }
    if (query.accessToken == null) {
      throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
    }
    const user = await this.userService.profile(query);
    let b = false;
    if ( mroute.author === Number(user.id) ) {
      b = true;
    }
    mroute.companions.forEach((item, i, arr) => {
      if ( item.id === user.id ) {
        b = true;
      }
    });
    if ( b ) {
      return mroute;
    }
    throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
  }

  async edit(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const user = await this.userService.profile({accessToken: query.accessToken});
    const mroute = await this.marschrouteModel.findById(body.id).exec();
    let b = false;
    if ( mroute.author === Number(user.id) ) {
      b = true;
    }
    mroute.companions.forEach((item, i, arr) => {
      if ( item.id === user.id && item.role === '1' ) {
        b = true;
      }
    });
    if ( b === false ) {
      throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
    }
    const res = await this.marschrouteModel.findOneAndUpdate({_id: body.id}, {...body}, {upsert: true, new: true});
    this.createSnap(res);
    return res;
  }

  async list(userId, query): Promise<any> {
    let user = {id: 0};
    if (userId === null) {
      if (await this.authService.checkAccessToken(query.accessToken) === false) {
        throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
      }
      user = await this.userService.profile({accessToken: query.accessToken});
      userId = user.id;
    } else {
      if ( await this.authService.checkAccessToken(query.accessToken) !== false ) {
        user = await this.userService.profile({accessToken: query.accessToken});
      }
    }

    const authorRoutes = await this.marschrouteModel.find({author: userId});
    const authorRoutesRes = [];
    authorRoutes.forEach((item, i, arr) => {
      if ( item.type !== 0 || item.author === Number(user.id) ) {
        authorRoutesRes.push(item);
      }
    });
    const companionRoutes = await this.marschrouteModel.find({
      $or: [
        {companions: {id: userId, role: '0'}},
        {companions: {id: userId, role: '1'}},
        ],
    });
    const companionRoutesRes = [];
    companionRoutes.forEach((item, i, arr) => {
      if ( item.type !== 0 || item.author === Number(user.id) ) {
        companionRoutesRes.push(item);
      }
    });
    const potentialCompanions = await this.marschrouteModel.find({
      $or: [
        {potentialCompanions: {id: userId, role: '0'}},
        {potentialCompanions: {id: userId, role: '1'}},
      ],
    });
    const potentialCompanionsRes = [];
    potentialCompanions.forEach((item, i, arr) => {
      if ( item.type !== 0 || item.author === Number(user.id) ) {
        potentialCompanionsRes.push(item);
      }
    });
    return {
      authorRoutes: authorRoutesRes,
      companionRoutes: companionRoutesRes,
      potentialCompanions: potentialCompanionsRes,
    };
  }

  async join(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const user = await this.userService.profile({accessToken: query.accessToken});
    const mroute = await this.marschrouteModel.findById(body.id).exec();
    let b = false;
    if ( mroute.author === Number(user.id) ) {
      b = true;
    }
    mroute.companions.forEach((item, i, arr) => {
      if ( item.id === user.id ) {
        b = true;
      }
    });
    if ( b ) {
      throw new HttpException('You are already a member', 400);
    }
    b = false;
    mroute.potentialCompanions.forEach((item, i, arr) => {
      if ( item.id === user.id ) {
        b = true;
      }
    });
    if ( b ) {
      throw new HttpException('You have already submitted a request', 400);
    }
    mroute.potentialCompanions.push({
      id: user.id,
      role: '0',
    });
    const res = await this.marschrouteModel.findOneAndUpdate({_id: body.id}, {
      potentialCompanions: mroute.potentialCompanions
    }, {upsert: true, new: true});
    this.createSnap(res);
    return res;
  }

  async approve(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const user = await this.userService.profile({accessToken: query.accessToken});
    const mroute = await this.marschrouteModel.findById(body.id).exec();
    if ( mroute.author !== Number(user.id) ) {
      throw new HttpException('User is not author', 401);
    }
    let b = -1;
    mroute.potentialCompanions.forEach((item, i, arr) => {
      if ( item.id === String(body.userId) ) {
        b = i;
      }
    });
    if ( b === -1 ) {
      throw new HttpException('User not found in route', 400);
    }
    mroute.companions.push({
      id: String(body.userId),
      role: '0',
    });
    const potentialCompanions = [];
    mroute.potentialCompanions.forEach((item, i, arr) => {
      if ( item.id !== String(body.userId) ) {
        potentialCompanions.push(item);
      }
    });
    const res = await this.marschrouteModel.findOneAndUpdate({_id: body.id}, {
      potentialCompanions: potentialCompanions,
      companions: mroute.companions,
    }, {upsert: true, new: true});
    this.createSnap(res);
    return res;
  }

  async leave(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const user = await this.userService.profile({accessToken: query.accessToken});
    const mroute = await this.marschrouteModel.findById(body.id).exec();

    let b = false;
    mroute.potentialCompanions.forEach((item, i, arr) => {
      if ( item.id === String(user.id) ) {
        b = true;
      }
    });
    if ( b ) {
      const potentialCompanions = [];
      mroute.potentialCompanions.forEach((item, i, arr) => {
        if ( item.id !== String(user.id) ) {
          potentialCompanions.push(item);
        }
      });
      const res = await this.marschrouteModel.findOneAndUpdate({_id: body.id}, {
        potentialCompanions: potentialCompanions,
      }, {upsert: true, new: true});
      this.createSnap(res);
      return res;
    }

    b = false;
    mroute.companions.forEach((item, i, arr) => {
      if ( item.id === String(user.id) ) {
        b = true;
      }
    });
    if ( b ) {
      const companions = [];
      mroute.companions.forEach((item, i, arr) => {
        if ( item.id !== String(user.id) ) {
          companions.push(item);
        }
      });
      const res = await this.marschrouteModel.findOneAndUpdate({_id: body.id}, {
        companions: companions,
      }, {upsert: true, new: true});
      this.createSnap(res);
      return res;
    }
    if ( mroute.author === Number(user.id) ) {
      const res = await this.marschrouteModel.findOneAndRemove({_id: body.id});
      //this.createSnap(res);
      return res;
    }
    throw new HttpException('User not found in route', 400);
  }

  async drop(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const user = await this.userService.profile({accessToken: query.accessToken});
    const mroute = await this.marschrouteModel.findById(body.id).exec();
    if ( Number(mroute.author) !== Number(user.id) ) {
      throw new HttpException('User is not author', 401);
    }

    let b = false;
    mroute.potentialCompanions.forEach((item, i, arr) => {
      if ( item.id === String(body.userId) ) {
        b = true;
      }
    });
    if ( b ) {
      const potentialCompanions = [];
      mroute.potentialCompanions.forEach((item, i, arr) => {
        if ( item.id !== String(body.userId) ) {
          potentialCompanions.push(item);
        }
      });
      const res = await this.marschrouteModel.findOneAndUpdate({_id: body.id}, {
        potentialCompanions: potentialCompanions,
      }, {upsert: true, new: true});
      this.createSnap(res);
      return res;
    }

    b = false;
    mroute.companions.forEach((item, i, arr) => {
      if ( item.id === String(body.userId) ) {
        b = true;
      }
    });
    if ( b ) {
      const companions = [];
      mroute.companions.forEach((item, i, arr) => {
        if ( item.id !== String(body.userId) ) {
          companions.push(item);
        }
      });
      const res = await this.marschrouteModel.findOneAndUpdate({_id: body.id}, {
        companions: companions,
      }, {upsert: true, new: true});
      this.createSnap(res);
      return res;
    }
    throw new HttpException('User not found in route', 400);
  }

  async role(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const user = await this.userService.profile({accessToken: query.accessToken});
    const mroute = await this.marschrouteModel.findById(body.id).exec();
    if ( mroute.author !== Number(user.id) ) {
      throw new HttpException('User is not author', 401);
    }
    let b = false;
    mroute.companions.forEach((item, i, arr) => {
      if ( item.id === body.userId ) {
        b = true;
      }
    });
    if ( b === false ) {
      throw new HttpException('User not found in route', 401);
    }
    const companions = [];
    mroute.companions.forEach((item, i, arr) => {
      if ( item.id === String(body.userId) ) {
        item.role = body.role;
      }
      companions.push(item);
    });
    const res = await this.marschrouteModel.findOneAndUpdate({_id: body.id}, {
      companions: mroute.companions,
    }, {upsert: true, new: true});
    this.createSnap(res);
    return res;
  }

  async places(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const user = await this.userService.profile({accessToken: query.accessToken});
    const mroute = await this.marschrouteModel.findById(body.id).exec();
    const res = await this.marschrouteModel.findOneAndUpdate({_id: body.id}, {places: body.places}, {upsert: true, new: true});
    this.createSnap(res);
    return res;
  }

}
