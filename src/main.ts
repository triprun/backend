import {NestFactory} from '@nestjs/core';
import {AppModule} from './modules/app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {SignatureMiddleware} from './middlewares/signature.middleware';
import {RedisIoAdapter} from './providers/redis.io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('TripRun')
    .setDescription('TripRun')
    .addBearerAuth('accesstoken')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
  const sm = new SignatureMiddleware();
  app.use(sm.use);
  app.enableCors();
  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(3030);
}

bootstrap();
