import {ApiModelProperty} from '@nestjs/swagger';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

export class UserPostRoleDto {

  @ApiModelProperty({
    description: 'Id пользователя',
    required: true,
  })
  readonly userId: number;

  @ApiModelProperty({
    description: 'Роль',
    required: true,
  })
  readonly role: number;

}
