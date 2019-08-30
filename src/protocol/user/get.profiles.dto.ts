import {ApiModelProperty} from '@nestjs/swagger';

export class UserGetProfilesDto {
  @ApiModelProperty({
    description: 'Id пользователей',
    required: false,
    isArray: true,
  })
  readonly ids: number;

}
