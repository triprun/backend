import { Module } from '@nestjs/common';
import { EntertainmentController } from '../controllers/entertainment.controller';
import { EntertainmentService } from '../services/entertainment.service';
import { entertainmentsProviders } from '../providers/entertainments.provider';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';

@Module({
  controllers: [EntertainmentController],
  imports: [DatabaseModule, AuthModule],
  providers: [
    EntertainmentService,
    ...entertainmentsProviders,
  ],
})
export class EntertainmentModule {}
