import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  TemporaryAnyResponse,
  TemporaryAnySwagger,
  TemporaryPostCreateDto,
  TemporaryGetSearchDto,
  TemporaryPostEditDto,
  TemporaryGetFetchDto,
  TemporaryPostDeleteDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('temporary')
@Controller('temporary')
export class TemporaryController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание временного места'})
  @ApiResponse({status: 200, type: TemporaryAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: TemporaryPostCreateDto, @Query() query): Promise<TemporaryAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('temporary');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Временное место по id'})
  @ApiResponse({status: 200, type: TemporaryAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: TemporaryGetFetchDto, @Query() query): Promise<TemporaryAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('temporary');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список временных мест'})
  @ApiResponse({status: 200, type: TemporaryAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: TemporaryGetSearchDto): Promise<TemporaryAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('temporary');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение временного места'})
  @ApiResponse({status: 200, type: TemporaryAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: TemporaryPostEditDto, @Query() query): Promise<TemporaryAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('temporary');
    return this.commonPlaceService.edit(body, query);
  }

  @ApiOperation({title: 'Удаление временного места'})
  @ApiResponse({status: 200, type: {}})
  @Post('delete')
  @HttpCode(200)
  async delete(@Body() body: TemporaryPostDeleteDto, @Query() query): Promise<any> {
    await this.commonPlaceService.enterCommonPlace('temporary');
    return this.commonPlaceService.delete(body, query);
  }

}
