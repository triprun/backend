import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Consts } from '../consts';
import {
  Restaurant,
  RestaurantPostCreateInterface,
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
    const createdRestaurant = new this.restaurantModel(body);
    return await createdRestaurant.save();
  }

  async findAll(body: RestaurantsGetCardInterface): Promise<RestaurantResponseGetCardInterface[]> {
    return await this.restaurantModel.find().exec();
  }

  async find(body: RestaurantGetCardInterface): Promise<RestaurantResponseGetCardInterface> {
    return await this.restaurantModel.find({ _id: body.restId }).exec();
  }
}
