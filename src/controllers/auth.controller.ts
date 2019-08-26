import {Controller, Get, Post, Body, HttpCode, Query} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import {
    AuthPostMailDto,
    AuthPostMailResponse,
    AuthPostMailSwagger,
    AuthGetLogoutDto,
    AuthPostAccessDto,
    AuthPostRefreshDto,
    AuthPostRefreshSwagger,
    AuthPostRefreshResponse,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,
                private readonly userService: UserService) {}


    @ApiOperation({ title: 'Авторизация пользователя по email' })
    @ApiResponse({ status: 200, type: AuthPostMailSwagger })
    @Post('mail')
    @HttpCode(200)
    async mail( @Body() body: AuthPostMailDto ): Promise<AuthPostMailResponse> {
        const res = await this.userService.login(body);
        return {
            ...res,
        };
    }

    @ApiOperation({ title: 'Выход из системы', description: 'Удалить текущий ключ. Вернет пустой json при успехе' })
    @ApiResponse({ status: 200, type: {} })
    @Get('logout')
    @HttpCode(200)
    async logout( @Query() query: AuthGetLogoutDto): Promise<any> {
        return this.userService.logout( query );
    }

    @ApiOperation({ title: 'Обновление access токена', description: '' })
    @ApiResponse({ status: 200, type: AuthPostRefreshSwagger })
    @Post('refresh')
    @HttpCode(200)
    async refresh( @Body() query: AuthPostRefreshDto): Promise<AuthPostRefreshResponse> {
        return this.userService.refresh( query );
    }

    @ApiOperation({ title: 'Проверка токена', description: 'Вернет пустой json при успехе' })
    @ApiResponse({ status: 200, type: {} })
    @Post('access')
    @HttpCode(200)
    async access(@Body() body: AuthPostAccessDto, @Query() query): Promise<any> {
        return this.userService.access(body , query);
    }

}
