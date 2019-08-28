import {Module} from '@nestjs/common';
import {Config} from '../config';
import {RedisModule} from 'nestjs-redis';
import {AuthModule} from './auth.module';
import {UserModule} from './user.module';
import {SightModule} from './sight.module';
import {HotelModule} from './hotel.module';
import {CommonPlaceModule} from './common.place.module';
import {EntertainmentModule} from './entertainment.module';
import {RestaurantModule} from './restaurant.module';
import {ConcertModule} from './concert.module';
import {RelaxModule} from './relax.module';
import {ShoppingModule} from './shopping.module';
import {ImpressionModule} from './impression.module';
import {TransportModule} from './transport.module';
import {CountryModule} from './country.module';

@Module({
  imports: [
    RedisModule.register({
      host: Config.redis_host,
      port: Config.redis_port,
    }),
    CommonPlaceModule,
    EntertainmentModule,
    AuthModule,
    UserModule,
    HotelModule,
    RestaurantModule,
    SightModule,
    ConcertModule,
    RelaxModule,
    ShoppingModule,
    ImpressionModule,
    TransportModule,
    CountryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
