import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  ImpressionAnyResponse,
  ImpressionAnySwagger,
  ImpressionPostCreateDto,
  ImpressionGetSearchDto,
  ImpressionPostEditDto,
  ImpressionGetFetchDto,
  ImpressionPostDeleteDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('impression')
@Controller('impression')
export class ImpressionController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание впечатления'})
  @ApiResponse({status: 200, type: ImpressionAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: ImpressionPostCreateDto, @Query() query): Promise<ImpressionAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('impression');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Место впечатления по id'})
  @ApiResponse({status: 200, type: ImpressionAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: ImpressionGetFetchDto, @Query() query): Promise<ImpressionAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('impression');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список впечатлений'})
  @ApiResponse({status: 200, type: ImpressionAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: ImpressionGetSearchDto): Promise<ImpressionAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('impression');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение впечатления'})
  @ApiResponse({status: 200, type: ImpressionAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: ImpressionPostEditDto, @Query() query): Promise<ImpressionAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('impression');
    return this.commonPlaceService.edit(body, query);
  }

  @ApiOperation({title: 'Удаление впечатления'})
  @ApiResponse({status: 200, type: {}})
  @Post('delete')
  @HttpCode(200)
  async delete(@Body() body: ImpressionPostDeleteDto, @Query() query): Promise<any> {
    await this.commonPlaceService.enterCommonPlace('impression');
    return this.commonPlaceService.delete(body, query);
  }

}
