import {Controller, Get, Post, Body, HttpCode, Query, Headers} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import {
    UserPostRegistrationDto,
    UserPostRegistrationResponse,
    UserPostRegistrationSwagger,
    UserGetProfileDto,
    UserGetProfileResponse,
    UserGetProfileSwagger,
    UserPostMailDto,
    UserPostMailResponse,
    UserPostMailSwagger,
    UserPostPasswordDto,
    UserPostPasswordResponse,
    UserPostPasswordSwagger,
    UserGetLogoutDto,
    UserPostAccessDto,
    UserPostRefreshDto,
    UserPostRefreshSwagger,
    UserPostRefreshResponse,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {   }

    @ApiOperation({ title: 'Регистрация пользователя' })
    @ApiResponse({ status: 200, type: UserPostRegistrationSwagger })
    @Post('registration')
    @HttpCode(200)
    async register( @Body() body: UserPostRegistrationDto, @Query() query): Promise<UserPostRegistrationResponse> {
        await this.userService.register(body, query);
        const res = await this.userService.login(body);
        return {
            ...res,
        };
    }

    @ApiOperation({ title: 'Авторизация пользователя по email' })
    @ApiResponse({ status: 200, type: UserPostMailSwagger })
    @Post('mail')
    @HttpCode(200)
    async mail( @Body() body: UserPostMailDto ): Promise<UserPostMailResponse> {
        const res = await this.userService.login(body);
        return {
            ...res,
        };
    }

    @ApiOperation({ title: 'Смена пароля пользователя с помощью accessToken', description: 'Обновляются токены' })
    @ApiResponse({ status: 200, type: UserPostPasswordSwagger })
    @Post('password')
    @HttpCode(200)
    password( @Body() body: UserPostPasswordDto, @Query() query ): Promise<UserPostPasswordResponse> {
        return this.userService.password(body, query);
    }

    @ApiOperation({ title: 'Профиль пользователя', description: 'Если вызвать без параметров, то вернется профиль текущего пользователя' })
    @ApiResponse({ status: 200, type: UserGetProfileSwagger })
    @Get('profile')
    @HttpCode(200)
    async profile( @Query() query: UserGetProfileDto): Promise<UserGetProfileResponse> {
        return this.userService.profile(query);
    }

    @ApiOperation({ title: 'Проверка токена', description: 'Вернет пустой json при успехе' })
    @ApiResponse({ status: 200, type: {} })
    @Post('access')
    @HttpCode(200)
    async access(@Body() body: UserPostAccessDto, @Query() query): Promise<any> {
        return this.userService.access(body , query);
    }

    @ApiOperation({ title: 'Обновление access токена', description: '' })
    @ApiResponse({ status: 200, type: UserPostRefreshSwagger })
    @Post('refresh')
    @HttpCode(200)
    async refresh( @Body() query: UserPostRefreshDto): Promise<UserPostRefreshResponse> {
        return this.userService.refresh( query );
    }

    @ApiOperation({ title: 'Выход из системы', description: 'Удалить текущий ключ. Вернет пустой json при успехе' })
    @ApiResponse({ status: 200, type: {} })
    @Get('logout')
    @HttpCode(200)
    async logout( @Query() query: UserGetLogoutDto): Promise<any> {
        return this.userService.logout( query );
    }

}
