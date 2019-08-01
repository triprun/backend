import { Controller, Get, Post, Body, HttpCode} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,
               /* private readonly userService: UserService*/) {}

    @Post('mail')
    @HttpCode(200)
    async mail( @Body() body ) {
        const res = await this.authService.mail(body);
       /* res.profile = this.userService.profile({
            accessToken: res.accessToken,
        });*/
        return res;
    }

    @Post('logout')
    @HttpCode(200)
    logout( @Body() body ) {
        return this.authService.logout(body);
    }

    @Post('refresh')
    @HttpCode(200)
    refresh( @Body() body ) {
        return this.authService.refresh(body);
    }

    @Post('access')
    @HttpCode(200)
    access( @Body() body ) {
        return this.authService.access(body);
    }

}
