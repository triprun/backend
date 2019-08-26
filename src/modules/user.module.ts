import {Module} from '@nestjs/common';
import {UserController} from '../controllers/user.controller';
import {UserService} from '../services/user.service';
import {DatabaseModule} from './database.module';
import {AuthModule} from './auth.module';
//import {CommonPlaceModule} from './common.place.module';
//import {UsersProvider} from '../providers/users.provider';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
   // ...UsersProvider,
  ],
  imports: [DatabaseModule, AuthModule/*, CommonPlaceModule*/],
  exports: [UserService],
})
export class UserModule {
}
