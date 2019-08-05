import { Module } from '@nestjs/common';
import { RestaurantController } from '../controllers/restaurant.controller';
import { RestaurantService } from '../services/restaurant.service';
import { restaurantsProviders } from '../providers/restaurants.provider';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';

@Module({
  controllers: [RestaurantController],
  imports: [DatabaseModule, AuthModule],
  providers: [
    RestaurantService,
    ...restaurantsProviders,
  ],
})
export class RestaurantModule {}
