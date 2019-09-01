import {ApiModelProperty} from '@nestjs/swagger';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

export class AuthPostMailDto {
  @ApiModelProperty({example: 'test1@mail.ru', description: 'E-mail', required: true})
  readonly email: string;

  @ApiModelProperty({example: 'password', description: 'Пароль', required: true})
  readonly password: string;

}
