import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Restaurant } from '../interfaces/restaurant.interface';
import { Consts } from '../consts';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(Consts.restaurants_rep)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async create(body: RestaurantInterface): Promise<Restaurant> {
    const createdRestaurant = new this.restaurantModel(body);
    return await createdRestaurant.save();
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantModel.find().exec();
  }

  async find(body: RestaurantInterface): Promise<Restaurant[]> {
    return await this.restaurantModel.find({ ...body }).exec();
  }
}
