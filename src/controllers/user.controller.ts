import {Controller, Get, Post, Body, HttpCode, Query, Headers} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  UserPostRegistrationDto,
  UserPostRegistrationResponse,
  UserPostRegistrationSwagger,
  UserGetProfileDto,
  UserGetProfileResponse,
  UserGetProfileSwagger,
  UserPostPasswordDto,
  UserPostPasswordResponse,
  UserPostPasswordSwagger,
  UserPostRoleDto,
  UserGetProfilesDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @ApiOperation({title: 'Регистрация пользователя'})
  @ApiResponse({status: 200, type: UserPostRegistrationSwagger})
  @Post('registration')
  @HttpCode(200)
  async register(@Body() body: UserPostRegistrationDto, @Query() query): Promise<UserPostRegistrationResponse> {
    await this.userService.register(body, query);
    const res = await this.userService.login(body);
    return {
      ...res,
    };
  }

  @ApiOperation({title: 'Смена пароля пользователя с помощью accessToken', description: 'Обновляются токены'})
  @ApiResponse({status: 200, type: UserPostPasswordSwagger})
  @Post('password')
  @HttpCode(200)
  async password(@Body() body: UserPostPasswordDto, @Query() query): Promise<UserPostPasswordResponse> {
    return this.userService.password(body, query);
  }

  @ApiOperation({
    title: 'Профиль пользователя',
    description: 'Если вызвать без параметров, то вернется профиль текущего пользователя'
  })
  @ApiResponse({status: 200, type: UserGetProfileSwagger})
  @Get('profile')
  @HttpCode(200)
  async profile(@Query() query: UserGetProfileDto): Promise<UserGetProfileResponse> {
    return this.userService.profile(query);
  }

  @ApiOperation({
    title: 'Профили списка пользователей',
    description: 'Если вызвать без параметров, то вернется профиль текущего пользователя'
  })
  @ApiResponse({status: 200, type: UserGetProfileSwagger, isArray: true})
  @Get('profiles')
  @HttpCode(200)
  async profiles(@Query() query: UserGetProfilesDto): Promise<UserGetProfileResponse[]> {
    return this.userService.profiles(query);
  }

  @ApiOperation({title: 'Установка роли', description: 'Принимает только значение 0-user,1-moderator,2-root'})
  @ApiResponse({status: 200, type: {}})
  @Post('role')
  @HttpCode(200)
  async role(@Body() body: UserPostRoleDto, @Query() query): Promise<any> {
    return this.userService.setRole(body, query);
  }

}
