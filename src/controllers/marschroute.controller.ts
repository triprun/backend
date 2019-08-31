import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {MarschrouteService} from '../services/marschroute.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  MarschrouteAnyResponse,
  MarschrouteAnySwagger,
  MarschroutePostCreateDto,
  MarschrouteGetSearchDto,
  MarschroutePostEditDto,
  MarschrouteGetFetchDto,
  MarschroutePostJoinDto,
  MarschroutePostApproveDto,
  MarschroutePostLeaveDto,
  MarschroutePostRoleDto,
  MarschrouteGetListDto,
  MarschroutePostPlaceInsertDto,
  MarschroutePostDropDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('marschroute')
@Controller('marschroute')
export class MarschrouteController {

  constructor(private readonly marschrouteService: MarschrouteService) {
  }

  @ApiOperation({title: 'Создание маршрута'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Post('create')
  @HttpCode(200)
  async create(@Body() body: MarschroutePostCreateDto, @Query() query): Promise<MarschrouteAnyResponse> {
    return this.marschrouteService.create(body, query);
  }

  @ApiOperation({title: 'Маршрут по id'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Get('fetch/:id')
  @HttpCode(200)
  async fetch(@Param() params: MarschrouteGetFetchDto, @Query() query): Promise<MarschrouteAnyResponse> {
    return this.marschrouteService.findById(params.id, query);
  }

  @ApiOperation({title: 'Список маршрутов по access token'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger, isArray: true})
  @Get('list')
  @HttpCode(200)
  async list(@Query() query): Promise<MarschrouteAnyResponse> {
    return this.marschrouteService.list(null, query);
  }

  @ApiOperation({title: 'Список маршрутов по userId'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Get('list/:userId')
  @HttpCode(200)
  async list2(@Param() params: MarschrouteGetListDto, @Query() query): Promise<MarschrouteAnyResponse> {
    return this.marschrouteService.list(params.userId, query);
  }

  @ApiOperation({title: 'Изменение маршрута'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Post('edit')
  @HttpCode(200)
  async edit(@Body() body: MarschroutePostEditDto, @Query() query): Promise<MarschrouteAnyResponse> {
    return this.marschrouteService.edit(body, query);
  }

  @ApiOperation({title: 'Сохранить список мест в маршруте'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Post('places')
  @HttpCode(200)
  async placeInsert(@Body() body: MarschroutePostPlaceInsertDto, @Query() query): Promise<MarschrouteAnyResponse> {
    return this.marschrouteService.places(body, query);
  }

  @ApiOperation({title: 'Запрос на присоединение к маршруту'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Post('join')
  @HttpCode(200)
  async join(@Body() body: MarschroutePostJoinDto, @Query() query): Promise<any> {
    return this.marschrouteService.join(body, query);
  }

  @ApiOperation({title: 'Подтвердить присоединение к маршруту'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Post('approve')
  @HttpCode(200)
  async approve(@Body() body: MarschroutePostApproveDto, @Query() query): Promise<any> {
    return this.marschrouteService.approve(body, query);
  }

  @ApiOperation({title: 'Выйти из маршрута'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Post('leave')
  @HttpCode(200)
  async leave(@Body() body: MarschroutePostLeaveDto, @Query() query): Promise<any> {
    return this.marschrouteService.leave(body, query);
  }

  @ApiOperation({title: 'Удалить пользователя из маршрута'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Post('dpop')
  @HttpCode(200)
  async drop(@Body() body: MarschroutePostDropDto, @Query() query): Promise<any> {
    return this.marschrouteService.drop(body, query);
  }

  @ApiOperation({title: 'Выдать роль'})
  @ApiResponse({status: 200, type: MarschrouteAnySwagger})
  @Post('role')
  @HttpCode(200)
  async role(@Body() body: MarschroutePostRoleDto, @Query() query): Promise<any> {
    return this.marschrouteService.role(body, query);
  }

}