import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SignatureMiddleware } from './middlewares/signature.middleware';

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
 // const bodyParser = require('body-parser');
  //app.use(bodyParser);
  await app.listen(3030);
}
bootstrap();
