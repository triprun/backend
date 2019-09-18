import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param, UploadedFile, UseInterceptors} from '@nestjs/common';
import {UploadService} from '../services/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitFile, ApiConsumes} from '@nestjs/swagger';
import {
  UploadPostImageDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('upload')
@Controller('upload')
export class UploadController {

  constructor(private readonly uploadService: UploadService) {
  }

  @ApiOperation({title: 'Загрузка изображения'})
  @ApiResponse({status: 200, type: {}})
  @Post('image')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @ApiImplicitFile({ name: 'file', required: true, description: 'file to upload' })
  image( @UploadedFile() file, @Query() query ): Promise<any> {
    return this.uploadService.image(file, query);
  }

}
