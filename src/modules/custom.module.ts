import {Module} from '@nestjs/common';
import {CustomController} from '../controllers/custom.controller';
import {customProviders} from '../providers/custom.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [CustomController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...customProviders,
  ],
})
export class CustomModule {
}
