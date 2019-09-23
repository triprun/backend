const https = require('https');
const http = require('http');

import express from 'express';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ExpressAdapter} from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import {AppModule} from './modules/app.module';
import {SignatureMiddleware} from './middlewares/signature.middleware';

async function bootstrap() {
  let config = {};
  if(process.env.PATH_TO_SSL_KEY && process.env.PATH_TO_SSL_CRT) {
    const fs = require('fs');
    const keyFile  = fs.readFileSync(`${process.env.PATH_TO_SSL_KEY}`);
    const certFile = fs.readFileSync(`${process.env.PATH_TO_SSL_CRT}`);
    config = {
      key: keyFile,
      cert: certFile
    }
  }
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
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
  await app.init();
  http.createServer(server).listen(3030);
  console.log(config);
  if(process.env.PATH_TO_SSL_KEY && process.env.PATH_TO_SSL_CRT) {
    console.log('got SSL certs, loading HTTPS...');
    https.createServer(config, server).listen(443);
    console.log('HTTPS server is up and running!');
  }
}

bootstrap();
