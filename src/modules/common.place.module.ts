import {Module} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {DatabaseModule} from './database.module';
import {hotelsProviders} from '../providers/hotels.provider';
import {etnertainmentsProviders} from '../providers/entertainments.provider';
import {restaurantsProviders} from '../providers/restaurant.provider';
import {sightsProviders} from '../providers/sight.provider';
import {concertsProviders} from '../providers/concert.provider';
import {relaxProviders} from '../providers/relax.provider';
import {shoppingProviders} from '../providers/shopping.provider';
import {impressionProviders} from '../providers/impression.provider';
import {transportProviders} from '../providers/transport.provider';
import {photoProviders} from '../providers/photo.provider';
import {temporaryProviders} from '../providers/temporary.provider';
import {customProviders} from '../providers/custom.provider';
import {AuthModule} from './auth.module';
import {UserModule} from './user.module';

@Module({
  controllers: [],
  providers: [
    CommonPlaceService,
    ...hotelsProviders,
    ...etnertainmentsProviders,
    ...restaurantsProviders,
    ...sightsProviders,
    ...concertsProviders,
    ...relaxProviders,
    ...shoppingProviders,
    ...impressionProviders,
    ...transportProviders,
    ...photoProviders,
    ...temporaryProviders,
    ...customProviders,
  ],
  imports: [DatabaseModule, AuthModule, UserModule],
  exports: [CommonPlaceService],
})
export class CommonPlaceModule {
}
