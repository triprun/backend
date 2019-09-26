import {Module} from '@nestjs/common';
import {UserController} from '../controllers/user.controller';
import {UserService} from '../services/user.service';
import {DatabaseModule} from './database.module';
import {AuthModule} from './auth.module';
import {uploadImageProviders} from '../providers/upload.image.provider';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    ...uploadImageProviders,
  ],
  imports: [DatabaseModule,  AuthModule],
  exports: [UserService],
})
export class UserModule {
}
