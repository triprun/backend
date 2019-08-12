import { Model } from 'mongoose';
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Consts } from '../consts';
import {
  Hotel,
  HotelPostCreateInterface,
  HotelPostEditInterface,
  HotelPostVerifyInterface,
  HotelPostDeleteInterface,
  HotelGetCardInterface,
  HotelsGetCardInterface,
  HotelResponseGetCardInterface,
} from '../interfaces/protocol';
import { AuthService } from './auth.service';

@Injectable()
export class HotelService {
  constructor(
    @Inject(Consts.hotels_rep)
    private readonly hotelModel: Model<Hotel>,
    private readonly authService: AuthService,
  ) {}

  async create(body: HotelPostCreateInterface): Promise<object> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const createdHotel = new this.hotelModel({ ...body, verified: false });
    return await createdHotel.save();
  }

  async findAll(body: HotelsGetCardInterface): Promise<object[]> {
    return await this.hotelModel.find().exec();
  }

  async find(body: HotelGetCardInterface): Promise<object> {
    return await this.hotelModel.find({ _id: body.hotelId }).exec();
  }

  async edit(body: HotelPostEditInterface): Promise<object> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    return await this.hotelModel.findOneAndUpdate({ _id: body.hotelId }, { ...body, verified: false }, { upsert: true, new: true });
  }

  async verify(body: HotelPostVerifyInterface): Promise<object> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    return await this.hotelModel.findOneAndUpdate({ _id: body.hotelId }, { verified: true }, { upsert: true, new: true });
  }

  async delete(body: HotelPostDeleteInterface): Promise<object> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const deleted = await this.hotelModel.find({ _id: body.hotelId }).remove().exec();
    if ( !deleted.ok ) return {
      status: 'error',
      error: 'seems like this restaurant got moved',
    };
    return deleted;
  }
}
