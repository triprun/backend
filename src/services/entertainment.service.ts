import { Model } from 'mongoose';
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Consts } from '../consts';
import {
  Entertainment,
  EntertainmentPostCreateInterface,
  EntertainmentPostEditInterface,
  EntertainmentPostVerifyInterface,
  EntertainmentPostDeleteInterface,
  EntertainmentGetCardInterface,
  EntertainmentsGetCardInterface,
  EntertainmentResponseGetCardInterface,
} from '../interfaces/protocol';
import { AuthService } from './auth.service';

@Injectable()
export class EntertainmentService {
  constructor(
    @Inject(Consts.entertainments_rep)
    private readonly entertainmentModel: Model<Entertainment>,
    private readonly authService: AuthService,
  ) {}

  async create(body: EntertainmentPostCreateInterface): Promise<object> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const createdRestaurant = new this.entertainmentModel({ ...body, verified: false });
    return await createdRestaurant.save();
  }

  async findAll(body: EntertainmentsGetCardInterface): Promise<object[]> {
    return await this.entertainmentModel.find().exec();
  }

  async find(body: EntertainmentGetCardInterface): Promise<object> {
    return await this.entertainmentModel.find({ _id: body.emId }).exec();
  }

  async edit(body: EntertainmentPostEditInterface): Promise<object> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    return await this.entertainmentModel.findOneAndUpdate({ _id: body.emId }, { ...body, verified: false }, { upsert: true, new: true });
  }

  async verify(body: EntertainmentPostVerifyInterface): Promise<object> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    return await this.entertainmentModel.findOneAndUpdate({ _id: body.emId }, { verified: true }, { upsert: true, new: true });
  }

  async delete(body: EntertainmentPostDeleteInterface): Promise<object> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const deleted = await this.entertainmentModel.find({ _id: body.emId }).remove().exec();
    if(!deleted.ok) return {
      status: 'error',
      error: 'seems like this restaurant got moved',
    };
    return deleted;
  }
}
