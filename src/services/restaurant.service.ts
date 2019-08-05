import { Model } from 'mongoose';
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Consts } from '../consts';
import {
  Restaurant,
  RestaurantPostCreateInterface,
  RestaurantPostEditInterface,
  RestaurantPostVerifyInterface,
  RestaurantPostDeleteInterface,
  RestaurantGetCardInterface,
  RestaurantsGetCardInterface,
  RestaurantResponseGetCardInterface
} from '../interfaces/protocol';
import { AuthService } from './auth.service';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(Consts.restaurants_rep)
    private readonly restaurantModel: Model<Restaurant>,
    private readonly authService: AuthService
  ) {}

  async create(body: RestaurantPostCreateInterface): Promise<RestaurantResponseGetCardInterface> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const createdRestaurant = new this.restaurantModel({ ...body, verified: false });
    return await createdRestaurant.save();
  }

  async findAll(body: RestaurantsGetCardInterface): Promise<RestaurantResponseGetCardInterface[]> {
    return await this.restaurantModel.find().exec();
  }

  async find(body: RestaurantGetCardInterface): Promise<object> {
    return await this.restaurantModel.find({ _id: body.restId }).exec();
  }

  async edit(body: RestaurantPostEditInterface): Promise<RestaurantResponseGetCardInterface> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    return await this.restaurantModel.findOneAndUpdate({ _id: body.restId }, { ...body, verified: false }, { upsert: true, new: true });
  }

  async verify(body: RestaurantPostVerifyInterface): Promise<RestaurantResponseGetCardInterface> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    return await this.restaurantModel.findOneAndUpdate({ _id: body.restId }, { verified: true }, { upsert: true, new: true });
  }

  async delete(body: RestaurantPostDeleteInterface): Promise<object> {
    if ( await this.authService.checkAccessToken(body.accessToken) === false ) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const deleted = await this.restaurantModel.find({ _id: body.restId }).remove().exec();
    if(!deleted.ok) return {
      status: 'error',
      error: 'seems like this restaurant got moved'
    };
    return deleted;
  }
}
