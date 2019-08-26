import {Module} from '@nestjs/common';
import {RestaurantController} from '../controllers/restaurant.controller';
import {restaurantsProviders} from '../providers/restaurant.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [RestaurantController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...restaurantsProviders,
  ],
})
export class RestaurantModule {
}
