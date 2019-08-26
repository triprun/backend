import {ApiModelProperty} from '@nestjs/swagger';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

export class UserPostRegistrationDto {
  @ApiModelProperty({
    description: 'E-mail',
    required: true,
  })
  readonly email: string;

  @ApiModelProperty({
    description: 'Имя',
    required: true,
  })
  readonly firstName: string;

  @ApiModelProperty({
    description: 'Фамилия',
    required: true,
  })
  readonly lastName: string;

  @ApiModelProperty({
    description: 'Пароль',
    required: true,
  })
  readonly password: string;

  @ApiModelProperty({
    description: 'Ник-нейм',
    required: false,
  })
  readonly userName: string;

}
