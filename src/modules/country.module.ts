import { Module } from '@nestjs/common';
import { CountryController } from '../controllers/country.controller';
import { CountryService } from '../services/country.service';
import { countriesProviders } from '../providers/countries.provider';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';

@Module({
  controllers: [CountryController],
  imports: [DatabaseModule, AuthModule],
  providers: [
    CountryService,
    ...countriesProviders,
  ],
})
export class CountryModule {}
