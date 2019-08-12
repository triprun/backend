import { Controller, Get, Post, Body, HttpCode} from '@nestjs/common';
import { EntertainmentService } from '../services/entertainment.service';

@Controller('entertainment')
export class EntertainmentController {

  constructor(private readonly entertainmentService: EntertainmentService) {}

  @Post('create')
  @HttpCode(200)
  create( @Body() body ) {
    return this.entertainmentService.create(body);
  }

  @Get('search')
  @HttpCode(200)
  findAll( @Body() body ) {
    return this.entertainmentService.findAll(body);
  }

  @Get('fetch')
  @HttpCode(200)
  find( @Body() body ) {
    return this.entertainmentService.find(body);
  }

  @Post('edit')
  @HttpCode(200)
  edit( @Body() body ) {
    return this.entertainmentService.edit(body);
  }

}
