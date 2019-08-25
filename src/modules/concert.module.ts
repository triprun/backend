import { Module } from '@nestjs/common';
import { ConcertController } from '../controllers/concert.controller';
import { concertsProviders } from '../providers/concert.provider';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [ConcertController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...concertsProviders,
  ],
})
export class ConcertModule {}
