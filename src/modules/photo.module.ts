import {Module} from '@nestjs/common';
import {PhotoController} from '../controllers/photo.controller';
import {photoProviders} from '../providers/photo.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [PhotoController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...photoProviders,
  ],
})
export class PhotoModule {
}
