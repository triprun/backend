import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  TransportAnyResponse,
  TransportAnySwagger,
  TransportPostCreateDto,
  TransportGetSearchDto,
  TransportPostEditDto,
  TransportGetFetchDto,
  TransportPostDeleteDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('transport')
@Controller('transport')
export class TransportController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание транспорта'})
  @ApiResponse({status: 200, type: TransportAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: TransportPostCreateDto, @Query() query): Promise<TransportAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('transport');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Транспорт по id'})
  @ApiResponse({status: 200, type: TransportAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: TransportGetFetchDto, @Query() query): Promise<TransportAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('transport');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список транспортов'})
  @ApiResponse({status: 200, type: TransportAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: TransportGetSearchDto): Promise<TransportAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('transport');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение транспорта'})
  @ApiResponse({status: 200, type: TransportAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: TransportPostEditDto, @Query() query): Promise<TransportAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('transport');
    return this.commonPlaceService.edit(body, query);
  }

  @ApiOperation({title: 'Удаление транспорта'})
  @ApiResponse({status: 200, type: {}})
  @Post('delete')
  @HttpCode(200)
  async delete(@Body() body: TransportPostDeleteDto, @Query() query): Promise<any> {
    await this.commonPlaceService.enterCommonPlace('transport');
    return this.commonPlaceService.delete(body, query);
  }

}
