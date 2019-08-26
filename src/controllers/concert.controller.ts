import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {CommonPlaceService} from '../services/common.place.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  ConcertAnyResponse,
  ConcertAnySwagger,
  ConcertPostCreateDto,
  ConcertGetSearchDto,
  ConcertPostEditDto,
  ConcertGetFetchDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('consert')
@Controller('consert')
export class ConcertController {

  constructor(private readonly commonPlaceService: CommonPlaceService) {
  }

  @ApiOperation({title: 'Создание концерта'})
  @ApiResponse({status: 200, type: ConcertAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: ConcertPostCreateDto, @Query() query): Promise<ConcertAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('concert');
    return this.commonPlaceService.create(body, query);
  }

  @ApiOperation({title: 'Концерт по id'})
  @ApiResponse({status: 200, type: ConcertAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: ConcertGetFetchDto, @Query() query): Promise<ConcertAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('concert');
    return this.commonPlaceService.findById(params.id);
  }

  @ApiOperation({title: 'Список концертов'})
  @ApiResponse({status: 200, type: ConcertAnySwagger, isArray: true})
  @Get('search')
  @HttpCode(200)
  async search(@Query() query: ConcertGetSearchDto): Promise<ConcertAnyResponse[]> {
    await this.commonPlaceService.enterCommonPlace('concert');
    return this.commonPlaceService.search(query);
  }

  @ApiOperation({title: 'Изменение концерта'})
  @ApiResponse({status: 200, type: ConcertAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: ConcertPostEditDto, @Query() query): Promise<ConcertAnyResponse> {
    await this.commonPlaceService.enterCommonPlace('concert');
    return this.commonPlaceService.edit(body, query);
  }

}
