import {ApiModelProperty} from '@nestjs/swagger';

export class UserGetProfileDto {
  @ApiModelProperty({
    description: 'Id пользователя',
    required: false,
  })
  readonly userId: number;

  @ApiModelProperty({
    description: 'Username пользователя',
    required: false,
  })
  readonly userName: string;

  readonly accessToken: string;
}
