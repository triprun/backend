import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { DatabaseModule } from './database.module';

@Module({
    controllers: [],
    providers: [
        AuthService,
    ],
    imports: [DatabaseModule],
    exports: [AuthService],
})
export class AuthModule {}
