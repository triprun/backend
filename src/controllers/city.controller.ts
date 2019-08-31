import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  CityAnyResponse,
  CityAnySwagger,
  CityPostCreateDto,
  CityGetSearchDto,
  CityPostEditDto,
  CityGetFetchDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('city')
@Controller('city')
export class CityController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание города'})
  @ApiResponse({status: 200, type: CityAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: CityPostCreateDto, @Query() query): Promise<CityAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('city');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Город по id'})
  @ApiResponse({status: 200, type: CityAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: CityGetFetchDto, @Query() query): Promise<CityAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('city');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список городов'})
  @ApiResponse({status: 200, type: CityAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: CityGetSearchDto): Promise<CityAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('city');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение города'})
  @ApiResponse({status: 200, type: CityAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: CityPostEditDto, @Query() query): Promise<CityAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('city');
    return this.commonPlaceService.edit(body, query);
  }

}
