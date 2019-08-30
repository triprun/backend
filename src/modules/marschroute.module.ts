import {Module} from '@nestjs/common';
import {MarschrouteController} from '../controllers/marschroute.controller';
import {marschrouteProviders} from '../providers/marschroute.provider';
import {marschrouteSnapProviders} from '../providers/marschroute.snap.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {MarschrouteService} from '../services/marschroute.service';
import {UserModule} from './user.module';

@Module({
  controllers: [MarschrouteController],
  imports: [DatabaseModule, AuthModule, UserModule],
  providers: [
    ...marschrouteProviders,
    ...marschrouteSnapProviders,
    MarschrouteService,
  ],
  exports: [MarschrouteService],
})
export class MarschrouteModule {
}
