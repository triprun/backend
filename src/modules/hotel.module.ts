import {Module} from '@nestjs/common';
import {HotelController} from '../controllers/hotel.controller';
import {hotelsProviders} from '../providers/hotels.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [HotelController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...hotelsProviders,
  ],
})
export class HotelModule {
}
