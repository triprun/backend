import { Module } from '@nestjs/common';
import { RestaurantController } from '../controllers/restaurant.controller';
import { RestaurantService } from '../services/restaurant.service';
import { restaurantsProviders } from '../providers/restaurants.providers';
import { DatabaseModule } from '../modules/database.module';

@Module({
  controllers: [RestaurantsController],
  imports: [DatabaseModule],
  providers: [
    RestaurantService,
    ...restaurantsProviders,
  ],
})
export class RestaurantModule {}
