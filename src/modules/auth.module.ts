import { Module } from '@nestjs/common';
import { AuthController} from '../controllers/auth.controller';
import { AuthService} from '../services/auth.service';
import { DatabaseModule } from '../modules/database.module';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
    ],
    imports: [DatabaseModule],
    exports: [AuthService],
})

export class AuthModule {}
