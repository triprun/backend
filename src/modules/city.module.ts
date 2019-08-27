import { Module } from '@nestjs/common';
import { CityController } from '../controllers/city.controller';
import { CityService } from '../services/city.service';
import { citiesProviders } from '../providers/cities.provider';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';

@Module({
  controllers: [CityController],
  imports: [DatabaseModule, AuthModule],
  providers: [
    CityService,
    ...citiesProviders,
  ],
})
export class CityModule {}
