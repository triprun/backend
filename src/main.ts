import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import {AppModule} from './modules/app.module';
import {SignatureMiddleware} from './middlewares/signature.middleware';

async function bootstrap() {
  let config = { cors: true };
  if(process.env.SSL_KEY && process.env.SSL_CRT) {
    const fs = require('fs');
    const keyFile  = fs.readFileSync(`${process.env.PATH_TO_SSL_KEY}`);
    const certFile = fs.readFileSync(`${process.env.PATH_TO_SSL_CRT}`);
    config = {
      ...config,
      httpsOptions: {
        key: keyFile,
        cert: certFile,
      }
    }
  }
  const app = await NestFactory.create(AppModule, config);
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
  app.use(helmet());
  app.use(csurf());
  app.enableCors();
  // const bodyParser = require('body-parser');
  //app.use(bodyParser);
  await app.listen(3030);
}

bootstrap();
