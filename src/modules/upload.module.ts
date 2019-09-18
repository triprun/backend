import {Module} from '@nestjs/common';
import {UploadController} from '../controllers/upload.controller';
import {UploadService} from '../services/upload.service';
import {DatabaseModule} from './database.module';
import {AuthModule} from './auth.module';

@Module({
  controllers: [UploadController],
  providers: [
    UploadService,
  ],
  imports: [DatabaseModule, AuthModule],
  exports: [UploadService],
})
export class UploadModule {
}
