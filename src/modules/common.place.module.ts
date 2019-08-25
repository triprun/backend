import { Module } from '@nestjs/common';
import { CommonPlaceService } from '../services/common.place.service';
import { DatabaseModule } from './database.module';
import { hotelsProviders } from '../providers/hotels.provider';
import { etnertainmentsProviders } from '../providers/entertainments.provider';
import { restaurantsProviders } from '../providers/restaurant.provider';
import { sightsProviders } from '../providers/sight.provider';
import { concertsProviders } from '../providers/concert.provider';
import {AuthModule} from './auth.module';

@Module({
    controllers: [],
    providers: [
        CommonPlaceService,
        ...hotelsProviders,
        ...etnertainmentsProviders,
        ...restaurantsProviders,
        ...sightsProviders,
        ...concertsProviders,
    ],
    imports: [DatabaseModule, AuthModule],
    exports: [CommonPlaceService],
})
export class CommonPlaceModule {}
