import { Controller, Get, Post, Body, HttpCode, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../services/upload.service';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('upload')
export class UploadController {

    constructor(private readonly uploadService: UploadService) {}

    @Post('image')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file'))
    image( @UploadedFile() file ) {
        return this.uploadService.image(file);
    }

}
