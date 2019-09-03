import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  ShoppingAnyResponse,
  ShoppingAnySwagger,
  ShoppingPostCreateDto,
  ShoppingGetSearchDto,
  ShoppingPostEditDto,
  ShoppingGetFetchDto,
  ShoppingPostDeleteDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('shopping')
@Controller('shopping')
export class ShoppingController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание места для покупок'})
  @ApiResponse({status: 200, type: ShoppingAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: ShoppingPostCreateDto, @Query() query): Promise<ShoppingAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('shopping');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Место для покупки по id'})
  @ApiResponse({status: 200, type: ShoppingAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: ShoppingGetFetchDto, @Query() query): Promise<ShoppingAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('shopping');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список мест для покупок'})
  @ApiResponse({status: 200, type: ShoppingAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: ShoppingGetSearchDto): Promise<ShoppingAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('shopping');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение места для покупок'})
  @ApiResponse({status: 200, type: ShoppingAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: ShoppingPostEditDto, @Query() query): Promise<ShoppingAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('shopping');
    return this.commonPlaceService.edit(body, query);
  }

  @ApiOperation({title: 'Удаление места для покупок'})
  @ApiResponse({status: 200, type: {}})
  @Post('delete')
  @HttpCode(200)
  async delete(@Body() body: ShoppingPostDeleteDto, @Query() query): Promise<any> {
    await this.commonPlaceService.enterCommonPlace('shopping');
    return this.commonPlaceService.delete(body, query);
  }

}
