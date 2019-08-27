import {Module} from '@nestjs/common';
import {TemporaryController} from '../controllers/temporary.controller';
import {temporaryProviders} from '../providers/temporary.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [TemporaryController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...temporaryProviders,
  ],
})
export class TemporaryModule {
}
