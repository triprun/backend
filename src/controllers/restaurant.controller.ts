import { Controller, Get, Post, Body, HttpCode} from '@nestjs/common';
import { RestaurantService } from '../services/restaurant.service';

@Controller('restaurant')
export class RestaurantController {

  constructor(private readonly restaurantsService: RestaurantService) {}

  @Post('create')
  @HttpCode(200)
  create( @Body() body ) {
    return this.restaurantsService.create(body);
  }

  @Get('restaurants')
  @HttpCode(200)
  findAll( @Body() body ) {
    return this.restaurantsService.findAll(body);
  }

  @Get('restaurant')
  @HttpCode(200)
  find( @Body() body ) {
    return this.restaurantsService.find(body);
  }

}
