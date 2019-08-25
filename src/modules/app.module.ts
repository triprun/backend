import { Module } from '@nestjs/common';
import { Config } from '../config';
import { RedisModule } from 'nestjs-redis';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { HotelModule } from './hotel.module';
import { CommonPlaceModule } from './common.place.module';
import { EntertainmentModule } from './entertainment.module';
import {CommonPlaceService} from '../services/common.place.service';

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

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
