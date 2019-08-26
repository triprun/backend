import {Module} from '@nestjs/common';
import {TransportController} from '../controllers/transport.controller';
import {transportProviders} from '../providers/transport.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [TransportController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...transportProviders,
  ],
})
export class TransportModule {
}
