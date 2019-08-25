import {Controller, Get, Post, Body, HttpCode, Query, Headers} from '@nestjs/common';
import { CommonPlaceService } from '../services/common.place.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import {
    SightAnyResponse,
    SightAnySwagger,
    SightPostCreateDto,
    SightGetSearchDto,
    SightPostEditDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('sight')
@Controller('sight')
export class SightController {

    constructor(private readonly commonPlaceService: CommonPlaceService) {   }

    @ApiOperation({ title: 'Создание достопримечательности' })
    @ApiResponse({ status: 200, type: SightAnySwagger })
    @Post('create')
    @HttpCode(200)
    async create( @Body() body: SightPostCreateDto, @Query() query): Promise<SightAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('sight');
        return this.commonPlaceService.create(body, query);
    }

    @ApiOperation({ title: 'Список достопримечательностей' })
    @ApiResponse({ status: 200, type: SightAnySwagger, isArray: true })
    @Get('search')
    @HttpCode(200)
    async search( @Query() query: SightGetSearchDto): Promise<SightAnyResponse[]> {
        await this.commonPlaceService.enterCommonPlace('sight');
        return this.commonPlaceService.search(query);
    }

    @ApiOperation({ title: 'Изменение достопримечательности' })
    @ApiResponse({ status: 200, type: SightAnySwagger })
    @Post('edit')
    @HttpCode(200)
    async edit( @Body() body: SightPostEditDto, @Query() query): Promise<SightAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('sight');
        return this.commonPlaceService.edit(body, query);
    }

}
