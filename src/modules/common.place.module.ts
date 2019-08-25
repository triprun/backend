import { Module } from '@nestjs/common';
import { CommonPlaceService } from '../services/common.place.service';
import { DatabaseModule } from './database.module';
import {hotelsProviders} from '../providers/hotels.provider';
import {etnertainmentsProviders} from '../providers/entertainments.provider';
import {AuthService} from '../services/auth.service';
import {AuthModule} from './auth.module';

@Module({
    controllers: [],
    providers: [
        CommonPlaceService,
        ...hotelsProviders,
        ...etnertainmentsProviders,
    ],
    imports: [DatabaseModule, AuthModule],
    exports: [CommonPlaceService],
})
export class CommonPlaceModule {}
