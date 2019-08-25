import {Controller, Get, Post, Body, HttpCode, Query, Headers} from '@nestjs/common';
import { CommonPlaceService } from '../services/common.place.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import {
    HotelAnyResponse,
    HotelAnySwagger,
    HotelPostCreateDto,
    HotelGetSearchDto,
    HotelPostEditDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('hotel')
@Controller('hotel')
export class HotelController {

    constructor(private readonly commonPlaceService: CommonPlaceService) {   }

    @ApiOperation({ title: 'Создание отеля' })
    @ApiResponse({ status: 200, type: HotelAnySwagger })
    @Post('create')
    @HttpCode(200)
    async create( @Body() body: HotelPostCreateDto, @Query() query): Promise<HotelAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('hotel');
        return this.commonPlaceService.create(body, query);
    }

    @ApiOperation({ title: 'Список отелей' })
    @ApiResponse({ status: 200, type: HotelAnySwagger, isArray: true })
    @Get('search')
    @HttpCode(200)
    async search( @Query() query: HotelGetSearchDto): Promise<HotelAnyResponse[]> {
        await this.commonPlaceService.enterCommonPlace('hotel');
        return this.commonPlaceService.search(query);
    }

    @ApiOperation({ title: 'Изменение отеля' })
    @ApiResponse({ status: 200, type: HotelAnySwagger })
    @Post('edit')
    @HttpCode(200)
    async edit( @Body() body: HotelPostEditDto, @Query() query): Promise<HotelAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('hotel');
        return this.commonPlaceService.edit(body, query);
    }

}
