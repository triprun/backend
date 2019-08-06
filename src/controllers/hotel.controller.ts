import { Controller, Get, Post, Body, HttpCode} from '@nestjs/common';
import { HotelService } from '../services/hotel.service';

@Controller('hotel')
export class HotelController {

  constructor(private readonly hotelService: hotelService) {}

  @Post('create')
  @HttpCode(200)
  create( @Body() body ) {
    return this.hotelService.create(body);
  }

  @Get('search')
  @HttpCode(200)
  findAll( @Body() body ) {
    return this.hotelService.findAll(body);
  }

  // @Post('filter')
  // @HttpCode(200)
  // findByCriteria( @Body() body ) {
  //   return this.hotelService.findByCriteria(body);
  // }

  @Get('fetch')
  @HttpCode(200)
  find( @Body() body ) {
    return this.hotelService.find(body);
  }

  @Post('edit')
  @HttpCode(200)
  edit( @Body() body ) {
    return this.hotelService.edit(body);
  }

}
