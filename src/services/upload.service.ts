import {Injectable, Inject, HttpException} from '@nestjs/common';
import {Consts} from '../consts';
import {Config} from '../config';
import moment = require('moment');
import {RedisService} from 'nestjs-redis';
import {AuthService} from './auth.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {

  constructor(
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
  ) {
  }

  async image(file, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    if ( typeof file === 'undefined') {
      throw new HttpException(Consts.ERROR_NO_FILE, 400);
    }
    if ( !(file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png')) {
      throw new HttpException(Consts.ERROR_MIME_TYPE, 400);
    }
    if ( file.size > Config.upload_images_file_size) {
      throw new HttpException(Consts.ERROR_FILE_SIZE, 400);
    }

    const ext = path.extname(file.originalname);
    const randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const p = Config.upload_images_path + `${randomName}${ext}`;
    const writeStream = fs.createWriteStream(p);
    writeStream.write(file.buffer);
    writeStream.end();
    return Config.upload_images_path_response + `${randomName}${ext}`;
  }

}
