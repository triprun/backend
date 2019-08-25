import { Module } from '@nestjs/common';
import { EntertainmentController } from '../controllers/entertainment.controller';
import { CommonPlaceService } from '../services/common.place.service';
import { etnertainmentsProviders } from '../providers/entertainments.provider';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [EntertainmentController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...etnertainmentsProviders,
  ],
})
export class EntertainmentModule {}
