import {Module} from '@nestjs/common';
import {RelaxController} from '../controllers/relax.controller';
import {relaxProviders} from '../providers/relax.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [RelaxController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...relaxProviders,
  ],
})
export class RelaxModule {
}
