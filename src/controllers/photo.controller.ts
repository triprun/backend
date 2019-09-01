import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  PhotoAnyResponse,
  PhotoAnySwagger,
  PhotoPostCreateDto,
  PhotoGetSearchDto,
  PhotoPostEditDto,
  PhotoGetFetchDto,
  PhotoPostDeleteDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('photo')
@Controller('photo')
export class PhotoController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание места для фото'})
  @ApiResponse({status: 200, type: PhotoAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: PhotoPostCreateDto, @Query() query): Promise<PhotoAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('photo');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Место для фото по id'})
  @ApiResponse({status: 200, type: PhotoAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: PhotoGetFetchDto, @Query() query): Promise<PhotoAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('photo');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список мест для фото'})
  @ApiResponse({status: 200, type: PhotoAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: PhotoGetSearchDto): Promise<PhotoAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('photo');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение места для фото'})
  @ApiResponse({status: 200, type: PhotoAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: PhotoPostEditDto, @Query() query): Promise<PhotoAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('photo');
    return this.commonPlaceService.edit(body, query);
  }

  @ApiOperation({title: 'Удаление места для фото'})
  @ApiResponse({status: 200, type: {}})
  @Post('delete')
  @HttpCode(200)
  async delete(@Body() body: PhotoPostDeleteDto, @Query() query): Promise<any> {
    await this.commonPlaceService.enterCommonPlace('photo');
    return this.commonPlaceService.delete(body, query);
  }

}
