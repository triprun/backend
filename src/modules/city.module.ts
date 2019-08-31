import {Module} from '@nestjs/common';
import {CityController} from '../controllers/city.controller';
import {cityProviders} from '../providers/city.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [CityController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...cityProviders,
  ],
})
export class CityModule {
}
