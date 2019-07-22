import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Users } from '../models/users.model';
import { Consts } from '../consts';
import { Config } from '../config';
import { Passwords } from '../models/passwords.model';
import { RedisService } from 'nestjs-redis';
import { AuthService } from './auth.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {

    @Inject(Consts.users_rep) private readonly TUsers: typeof Users;
    @Inject(Consts.passwords_rep) private readonly TPasswords: typeof Passwords;

    constructor(
        private readonly redisService: RedisService,
        private readonly authService: AuthService,
    ) { }

    async image(file) {

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

        const sharp = require('sharp');

        await sharp(file.buffer)
            .resize(75, null)
            .toFile(Config.upload_images_path + '75____' + `${randomName}${ext}`);

        await sharp(file.buffer)
            .resize(130, null)
            .toFile(Config.upload_images_path + '130____' + `${randomName}${ext}`);

        await sharp(file.buffer)
            .resize(604, null)
            .toFile(Config.upload_images_path + '604____' + `${randomName}${ext}`);

        await sharp(file.buffer)
            .resize(3000, null, {withoutEnlargement: true})
            .toFile(Config.upload_images_path + '3000____' + `${randomName}${ext}`);

        file.buffer = {};
        return file;
    }

}
