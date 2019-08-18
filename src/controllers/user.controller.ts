import { Controller, Get, Post, Body, Param, HttpCode} from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('registration')
    @HttpCode(200)
    register( @Body() body ) {
      return this.userService.register(body);
    }

    @Post('password')
    @HttpCode(200)
    password( @Body() body ) {
      return this.userService.password(body);
    }

    @Get('profile/:id')
    @HttpCode(200)
    foreignProfile( @Param() params: string ) {
      return this.userService.foreignProfile({ id: params.id });
    }

    @Post('profile')
    @HttpCode(200)
    profile( @Body() body ) {
      return this.userService.profile(body);
    }

}
