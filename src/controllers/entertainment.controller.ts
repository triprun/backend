import {Controller, Get, Post, Body, HttpCode, Query, Headers} from '@nestjs/common';
import { CommonPlaceService } from '../services/common.place.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import {
    EntertainmentAnyResponse,
    EntertainmentAnySwagger,
    EntertainmentPostCreateDto,
    EntertainmentGetSearchDto,
    EntertainmentPostEditDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('entertainment')
@Controller('entertainment')
export class EntertainmentController {

    constructor(private readonly commonPlaceService: CommonPlaceService) {   }

    @ApiOperation({ title: 'Создание развлечения' })
    @ApiResponse({ status: 200, type: EntertainmentAnySwagger })
    @Post('create')
    @HttpCode(200)
    async create( @Body() body: EntertainmentPostCreateDto, @Query() query): Promise<EntertainmentAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('entertainment');
        return this.commonPlaceService.create(body, query);
    }

    @ApiOperation({ title: 'Список развлечений' })
    @ApiResponse({ status: 200, type: EntertainmentAnySwagger, isArray: true })
    @Get('search')
    @HttpCode(200)
    async search( @Query() query: EntertainmentGetSearchDto): Promise<EntertainmentAnyResponse[]> {
        await this.commonPlaceService.enterCommonPlace('entertainment');
        return this.commonPlaceService.search(query);
    }

    @ApiOperation({ title: 'Изменение развлечения' })
    @ApiResponse({ status: 200, type: EntertainmentAnySwagger })
    @Post('edit')
    @HttpCode(200)
    async edit( @Body() body: EntertainmentPostEditDto, @Query() query): Promise<EntertainmentAnyResponse> {
        await this.commonPlaceService.enterCommonPlace('entertainment');
        return this.commonPlaceService.edit(body, query);
    }

}
