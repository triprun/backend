import {Module} from '@nestjs/common';
import {CountryController} from '../controllers/country.controller';
import {countryProviders} from '../providers/country.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [CountryController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...countryProviders,
  ],
})
export class CountryModule {
}
