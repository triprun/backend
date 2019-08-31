import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  CountryAnyResponse,
  CountryAnySwagger,
  CountryPostCreateDto,
  CountryGetSearchDto,
  CountryPostEditDto,
  CountryGetFetchDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('hotel')
@Controller('hotel')
export class CountryController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание страны'})
  @ApiResponse({status: 200, type: CountryAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: CountryPostCreateDto, @Query() query): Promise<CountryAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('country');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Страна по id'})
  @ApiResponse({status: 200, type: CountryAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: CountryGetFetchDto, @Query() query): Promise<CountryAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('country');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список стран'})
  @ApiResponse({status: 200, type: CountryAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: CountryGetSearchDto): Promise<CountryAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('country');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение страны'})
  @ApiResponse({status: 200, type: CountryAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: CountryPostEditDto, @Query() query): Promise<CountryAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('country');
    return this.commonPlaceService.edit(body, query);
  }

}
