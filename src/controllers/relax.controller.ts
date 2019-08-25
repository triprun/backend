import {Controller, Get, Post, Body, HttpCode, Query, Headers} from '@nestjs/common';
import { CommonPlaceService } from '../services/common.place.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import {
    RelaxAnyResponse,
    RelaxAnySwagger,
    RelaxPostCreateDto,
    RelaxGetSearchDto,
    RelaxPostEditDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('relax')
@Controller('relax')
export class RelaxController {

    constructor(private readonly commonPlaceService: CommonPlaceService) {   }

    @ApiOperation({ title: 'Создание места для отдыха' })
    @ApiResponse({ status: 200, type: RelaxAnySwagger })
    @Post('create')
    @HttpCode(200)
    async create( @Body() body: RelaxPostCreateDto, @Query() query): Promise<RelaxAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('relax');
        return this.commonPlaceService.create(body, query);
    }

    @ApiOperation({ title: 'Список мест для отдыха' })
    @ApiResponse({ status: 200, type: RelaxAnySwagger, isArray: true })
    @Get('search')
    @HttpCode(200)
    async search( @Query() query: RelaxGetSearchDto): Promise<RelaxAnyResponse[]> {
        await this.commonPlaceService.enterCommonPlace('relax');
        return this.commonPlaceService.search(query);
    }

    @ApiOperation({ title: 'Изменение места для отдыха' })
    @ApiResponse({ status: 200, type: RelaxAnySwagger })
    @Post('edit')
    @HttpCode(200)
    async edit( @Body() body: RelaxPostEditDto, @Query() query): Promise<RelaxAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('relax');
        return this.commonPlaceService.edit(body, query);
    }

}
