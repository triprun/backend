import { Controller, Get, Post, Body, HttpCode} from '@nestjs/common';
import { RestaurantService } from '../services/restaurant.service';

@Controller('restaurant')
export class RestaurantController {

  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('create')
  @HttpCode(200)
  create( @Body() body ) {
    return this.restaurantService.create(body);
  }

  @Get('search')
  @HttpCode(200)
  findAll( @Body() body ) {
    return this.restaurantService.findAll(body);
  }

  @Get('fetch')
  @HttpCode(200)
  find( @Body() body ) {
    return this.restaurantService.find(body);
  }

  @Post('edit')
  @HttpCode(200)
  edit( @Body() body ) {
    return this.restaurantService.edit(body);
  }

}
