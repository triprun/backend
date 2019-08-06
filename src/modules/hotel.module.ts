import { Module } from '@nestjs/common';
import { HotelController } from '../controllers/hotel.controller';
import { HotelService } from '../services/hotel.service';
import { hotelsProviders } from '../providers/hotels.provider';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';

@Module({
  controllers: [HotelController],
  imports: [DatabaseModule, AuthModule],
  providers: [
    HotelService,
    ...hotelsProviders,
  ],
})
export class HotelModule {}
