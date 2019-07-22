import { Controller, Get, Post, Body, HttpCode} from '@nestjs/common';
import {AuthService} from '../services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('mail')
    @HttpCode(200)
    mail( @Body() body ) {
        return this.authService.mail(body);
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
