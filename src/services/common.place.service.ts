import {Injectable, Inject, HttpException} from '@nestjs/common';
import { Model } from 'mongoose';
import { Consts } from '../consts';
import { RedisService } from 'nestjs-redis';
import { IHotel } from '../schemas/hotel.interface';
import { IEntertainment } from '../schemas/entertainment.interface';
import { IRestaurant } from '../schemas/restaurant.interface';
import { ISight } from '../schemas/sight.interface';
import { IConcert } from '../schemas/concert.interface';
import { IRelax } from '../schemas/relax.interface';
import { IShopping } from '../schemas/shopping.interface';

import { AuthService } from './auth.service';

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
        private readonly redisService: RedisService,
        private readonly authService: AuthService,
    ) {}

    async enterCommonPlace( value ) {
        if ( value === 'hotel' ) {
            this.commonPlace = this.hotelModel;
        } else if ( value === 'entertainment' ) {
            this.commonPlace = this.entertainmentModel;
        } else if ( value === 'restaurant' ) {
            this.commonPlace = this.restaurantModel;
        } else if ( value === 'sight' ) {
            this.commonPlace = this.sightModel;
        } else if ( value === 'concert' ) {
            this.commonPlace = this.concertModel;
        } else if ( value === 'relax' ) {
            this.commonPlace = this.relaxModel;
        }  else if ( value === 'shopping' ) {
            this.commonPlace = this.shoppingModel;
        } else {
            this.commonPlace = null;
        }
    }

    // todo: guard access token admin
    async create(body, query): Promise<any> {
        if ( await this.authService.checkAccessToken(query.accessToken) === false ) {
            throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
        }
        const common = new this.commonPlace({ ...body, verified: false });
        common.id = common._id;
        return await common.save();
    }

    async search(query): Promise<any[]> {
        let qu;
        if ( query.name == null ) {
            qu = this.commonPlace.find();
        } else {
            qu = this.commonPlace.find({name: new RegExp(query.name,'i')});
        }
        return await qu.limit(Number(query.limit)).skip(Number(query.skip)).exec();
    }

    // todo: guard access token admin
    async edit(body, query): Promise<any> {
        if ( await this.authService.checkAccessToken(query.accessToken) === false ) {
            throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
        }
        return await this.commonPlace.findOneAndUpdate({ _id: body.id }, { verified: true }, { upsert: true, new: true });
    }

}
