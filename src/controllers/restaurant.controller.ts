import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import { CommonPlaceService } from '../services/common.place.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import {
    RestaurantAnyResponse,
    RestaurantAnySwagger,
    RestaurantPostCreateDto,
    RestaurantGetSearchDto,
    RestaurantPostEditDto,
    RestaurantGetFetchDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('restaurant')
@Controller('restaurant')
export class RestaurantController {

    constructor(private readonly commonPlaceService: CommonPlaceService) {   }

    @ApiOperation({ title: 'Создание ресторана' })
    @ApiResponse({ status: 200, type: RestaurantAnySwagger })
    @Post('create')
    @HttpCode(200)
    async create( @Body() body: RestaurantPostCreateDto, @Query() query): Promise<RestaurantAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('restaurant');
        return this.commonPlaceService.create(body, query);
    }

    @ApiOperation({ title: 'Ресторан по id' })
    @ApiResponse({ status: 200, type: RestaurantAnySwagger })
    @Get('fetch/:id')
    @HttpCode(200)
    async fetch( @Param() params: RestaurantGetFetchDto, @Query() query): Promise<RestaurantAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('restaurant');
        return this.commonPlaceService.findById(params.id);
    }

    @ApiOperation({ title: 'Список ресторанов' })
    @ApiResponse({ status: 200, type: RestaurantAnySwagger, isArray: true })
    @Get('search')
    @HttpCode(200)
    async search( @Query() query: RestaurantGetSearchDto): Promise<RestaurantAnyResponse[]> {
        await this.commonPlaceService.enterCommonPlace('restaurant');
        return this.commonPlaceService.search(query);
    }

    @ApiOperation({ title: 'Изменение ресторана' })
    @ApiResponse({ status: 200, type: RestaurantAnySwagger })
    @Post('edit')
    @HttpCode(200)
    async edit( @Body() body: RestaurantPostEditDto, @Query() query): Promise<RestaurantAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('restaurant');
        return this.commonPlaceService.edit(body, query);
    }

}
