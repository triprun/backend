import { Module } from '@nestjs/common';
import { UserController} from '../controllers/user.controller';
import { UserService} from '../services/user.service';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
    ],
    imports: [DatabaseModule, AuthModule],
})
export class UserModule {}
