import { Module } from '@nestjs/common';
import { SightController } from '../controllers/sight.controller';
import { sightsProviders } from '../providers/sight.provider';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [SightController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...sightsProviders,
  ],
})
export class SightModule {}
