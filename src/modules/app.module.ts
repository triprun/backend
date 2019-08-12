import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { RestaurantModule } from './restaurant.module';
import { EntertainmentModule } from './entertainment.module';
import { HotelModule } from './hotel.module';
import { UploadModule } from './upload.module';
import { RedisModule } from 'nestjs-redis';
import { Config } from '../config';

@Module({
  imports: [
      RedisModule.register({
        host: Config.redis_host,
        port: Config.redis_port,
      }),
      AuthModule,
      UserModule,
      UploadModule,
      HotelModule,
      RestaurantModule,
      EntertainmentModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
