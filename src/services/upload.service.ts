import {Injectable, Inject, HttpException} from '@nestjs/common';
import {Consts} from '../consts';
import {Config} from '../config';
import moment = require('moment');
import {RedisService} from 'nestjs-redis';
import {AuthService} from './auth.service';
import * as fs from 'fs';
import * as path from 'path';
import {IUploadImage} from '../schemas/upload.image.interface';
import {Model} from 'mongoose';

@Injectable()
export class UploadService {

  constructor(
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
    @Inject(Consts.upload_image_rep)
    private readonly uploadImageModel: Model<IUploadImage>,
  ) {
  }

  async image(file, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.this.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    if ( typeof file === 'undefined') {
      throw new HttpException(Consts.ERROR_NO_FILE, 400);
    }
    if ( !(file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png')) {
      throw new HttpException(Consts.ERROR_MIME_TYPE, 400);
    }
    if ( file.size > Config.upload_images_file_size_max ) {
      throw new HttpException(Consts.ERROR_FILE_SIZE, 400);
    }
    if ( file.size < Config.upload_images_file_size_min ) {
      throw new HttpException(Consts.ERROR_FILE_SIZE, 400);
    }

    const ext = path.extname(file.originalname);
    const randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const p = Config.upload_images_path + `${randomName}${ext}`;
    const writeStream = fs.createWriteStream(p);
    writeStream.write(file.buffer);
    writeStream.end();

    const sharp = require('sharp');
    const images = [];

    let image = {
      path: Config.upload_images_path_response + `${randomName}${ext}`,
      size: 'original',
    };
    images.push(image);

    await sharp(file.buffer)
      .resize(75, null)
      .toFile(Config.upload_images_path + '75____' + `${randomName}${ext}`);
    image = {
      path: Config.upload_images_path_response + '75____' + `${randomName}${ext}`,
      size: 'preview',
    };
    images.push(image);

    const imageM = new this.uploadImageModel({
      created_at: moment().unix(),
      author: query.this.userId,
      name: query.name,
      description: query.description,
      images: images,
    });
    imageM.id = imageM._id;
    return await imageM.save();

    return imageM;
  }

}
