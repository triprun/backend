import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  CustomAnyResponse,
  CustomAnySwagger,
  CustomPostCreateDto,
  CustomGetSearchDto,
  CustomPostEditDto,
  CustomGetFetchDto,
  CustomPostDeleteDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('custom')
@Controller('custom')
export class CustomController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание пользовательского места'})
  @ApiResponse({status: 200, type: CustomAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: CustomPostCreateDto, @Query() query): Promise<CustomAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('custom');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Пользовательское место по id'})
  @ApiResponse({status: 200, type: CustomAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: CustomGetFetchDto, @Query() query): Promise<CustomAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('custom');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список пользовательских мест'})
  @ApiResponse({status: 200, type: CustomAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: CustomGetSearchDto): Promise<CustomAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('custom');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение пользовательского места'})
  @ApiResponse({status: 200, type: CustomAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: CustomPostEditDto, @Query() query): Promise<CustomAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('custom');
    return this.commonPlaceService.edit(body, query);
  }

  @ApiOperation({title: 'Удаление пользовательского места'})
  @ApiResponse({status: 200, type: {}})
  @Post('delete')
  @HttpCode(200)
  async delete(@Body() body: CustomPostDeleteDto, @Query() query): Promise<any> {
    await this.commonPlaceService.enterCommonPlace('custom');
    return this.commonPlaceService.delete(body, query);
  }

}
