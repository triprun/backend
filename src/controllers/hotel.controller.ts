import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  HotelAnyResponse,
  HotelAnySwagger,
  HotelPostCreateDto,
  HotelGetSearchDto,
  HotelPostEditDto,
  HotelGetFetchDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('hotel')
@Controller('hotel')
export class HotelController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание отеля'})
  @ApiResponse({status: 200, type: HotelAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: HotelPostCreateDto, @Query() query): Promise<HotelAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('hotel');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Отель по id'})
  @ApiResponse({status: 200, type: HotelAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: HotelGetFetchDto, @Query() query): Promise<HotelAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('hotel');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список отелей'})
  @ApiResponse({status: 200, type: HotelAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: HotelGetSearchDto): Promise<HotelAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('hotel');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение отеля'})
  @ApiResponse({status: 200, type: HotelAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: HotelPostEditDto, @Query() query): Promise<HotelAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('hotel');
    return this.commonPlaceService.edit(body, query);
  }

}
