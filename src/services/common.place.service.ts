import { Injectable, Inject, HttpException} from '@nestjs/common';
import { Model } from 'mongoose';
import { Consts } from '../consts';
import { RedisService } from 'nestjs-redis';
import { UserService } from './user.service';
import { IHotel } from '../schemas/hotel.interface';
import { IEntertainment } from '../schemas/entertainment.interface';
import { IRestaurant } from '../schemas/restaurant.interface';
import { ISight } from '../schemas/sight.interface';
import { IConcert } from '../schemas/concert.interface';
import { IRelax } from '../schemas/relax.interface';
import { IShopping } from '../schemas/shopping.interface';
import { IImpression } from '../schemas/impression.interface';
import { ITransport } from '../schemas/transport.interface';
import { ICountry } from '../schemas/country.interface';
import { ICity } from '../schemas/city.interface';
import { IPhoto} from '../schemas/photo.interface';
import { ITemporary } from '../schemas/temporary.interface';
import { ICustom } from '../schemas/custom.interface';

import {AuthService} from './auth.service';

@Injectable()
export class CommonPlaceService {

  commonPlace: any;

  constructor(
    @Inject(Consts.hotels_rep)
    private readonly hotelModel: Model<IHotel>,
    @Inject(Consts.entertainments_rep)
    private readonly entertainmentModel: Model<IEntertainment>,
    @Inject(Consts.restaurants_rep)
    private readonly restaurantModel: Model<IRestaurant>,
    @Inject(Consts.sights_rep)
    private readonly sightModel: Model<ISight>,
    @Inject(Consts.concerts_rep)
    private readonly concertModel: Model<IConcert>,
    @Inject(Consts.relax_rep)
    private readonly relaxModel: Model<IRelax>,
    @Inject(Consts.shopping_rep)
    private readonly shoppingModel: Model<IShopping>,
    @Inject(Consts.impression_rep)
    private readonly impressionModel: Model<IImpression>,
    @Inject(Consts.transport_rep)
    private readonly transportModel: Model<ITransport>,
    @Inject(Consts.country_rep)
    private readonly countryModel: Model<ICountry>,
    @Inject(Consts.city_rep)
    private readonly cityModel: Model<ICity>,
    @Inject(Consts.photo_rep)
    private readonly photoModel: Model<IPhoto>,
    @Inject(Consts.temporary_rep)
    private readonly temporaryModel: Model<ITemporary>,
    @Inject(Consts.custom_rep)
    private readonly customModel: Model<ICustom>,
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  async enterCommonPlace(value) {
    if (value === 'hotel') {
      this.commonPlace = this.hotelModel;
    } else if (value === 'entertainment') {
      this.commonPlace = this.entertainmentModel;
    } else if (value === 'restaurant') {
      this.commonPlace = this.restaurantModel;
    } else if (value === 'sight') {
      this.commonPlace = this.sightModel;
    } else if (value === 'concert') {
      this.commonPlace = this.concertModel;
    } else if (value === 'relax') {
      this.commonPlace = this.relaxModel;
    } else if (value === 'shopping') {
      this.commonPlace = this.shoppingModel;
    } else if (value === 'impression') {
      this.commonPlace = this.impressionModel;
    } else if (value === 'transport') {
      this.commonPlace = this.transportModel;
    } else if (value === 'country') {
      this.commonPlace = this.countryModel;
    } else if (value === 'city') {
      this.commonPlace = this.cityModel;
    } else if (value === 'photo') {
      this.commonPlace = this.photoModel;
    } else if (value === 'temporary') {
      this.commonPlace = this.temporaryModel;
    } else if (value === 'custom') {
      this.commonPlace = this.customModel;
    } else {
      this.commonPlace = null;
    }
  }

  async create(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    if (query.userRole === 0) {
      throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
    }
    const common = new this.commonPlace({...body, verified: false});
    common.id = common._id;
    return await common.save();
  }

  async findById(id): Promise<any> {
    return await this.commonPlace.findById(id).exec();
  }

  async search(query): Promise<any[]> {
    let qu;
    if (query.name == null) {
      qu = this.commonPlace.find();
    } else {
      qu = this.commonPlace.find({name: new RegExp(query.name, 'i')});
    }
    return await qu.limit(Number(query.limit)).skip(Number(query.skip)).exec();
  }

  async edit(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    if (query.userRole === 0) {
      throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
    }
    return await this.commonPlace.findOneAndUpdate({_id: body.id}, {verified: true}, {upsert: true, new: true});
  }

  async delete(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    if (query.userRole === 0) {
      throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
    }
    const res = await this.commonPlace.findOneAndRemove({_id: body.id});
    return {};
  }

}
