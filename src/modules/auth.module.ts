import {Module} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {DatabaseModule} from './database.module';
import {AuthController} from '../controllers/auth.controller';
import {UserService} from '../services/user.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
  ],
  imports: [DatabaseModule],
  exports: [AuthService],
})
export class AuthModule {
}
