import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { DatabaseModule } from '../modules/database.module';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService
    ],
    imports: [DatabaseModule],
    exports: [AuthService],
})
export class AuthModule {}
