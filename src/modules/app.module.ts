import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { UploadModule } from './upload.module';
import { RedisModule } from 'nestjs-redis';
import { Config } from '../config';

@Module({
  imports: [
      RedisModule.register({
        host: Config.redis_host,
        port: Config.redis_port,
      }),
      AuthModule,
      UserModule,
      UploadModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule {}
