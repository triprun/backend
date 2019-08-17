import { Controller, Get, Post, Body, HttpCode} from '@nestjs/common';
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

    @Post('profile')
    @HttpCode(200)
    profile( @Body() body ) {
        return this.userService.profile(body);
    }

}
