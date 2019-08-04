import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Consts } from '../consts';
import {
  Restaurant,
  RestaurantPostCreateInterface,
  RestaurantPostEditInterface,
  RestaurantPostVerifyInterface,
  RestaurantGetCardInterface,
  RestaurantsGetCardInterface,
  RestaurantResponseGetCardInterface
} from '../interfaces/protocol';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(Consts.restaurants_rep)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async create(body: RestaurantPostCreateInterface): Promise<RestaurantResponseGetCardInterface> {
    const createdRestaurant = new this.restaurantModel({ ...body, verified: false });
    return await createdRestaurant.save();
  }

  async findAll(body: RestaurantsGetCardInterface): Promise<RestaurantResponseGetCardInterface[]> {
    return await this.restaurantModel.find().exec();
  }

  async find(body: RestaurantGetCardInterface): Promise<RestaurantResponseGetCardInterface> {
    return await this.restaurantModel.find({ _id: body.restId }).exec();
  }

  async edit(body: RestaurantPostEditInterface): Promise<RestaurantResponseGetCardInterface> {
    return await this.restaurantModel.findOneAndUpdate({ _id: body.restId }, { ...body, verified: false }, { upsert: true, new: true });
  }

  async verify(body: RestaurantPostVerifyInterface): Promise<RestaurantResponseGetCardInterface> {
    return await this.restaurantModel.findOneAndUpdate({ _id: body.restId }, { verified: true }, { upsert: true, new: true });
  }
}
