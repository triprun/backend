import {Module} from '@nestjs/common';
import {ImpressionController} from '../controllers/impression.controller';
import {impressionProviders} from '../providers/impression.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [ImpressionController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...impressionProviders,
  ],
})
export class ImpressionModule {
}
