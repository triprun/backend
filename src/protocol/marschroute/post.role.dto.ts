import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostRoleDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  @ApiModelProperty({example: '', description: ''})
  readonly userId: string;

  @ApiModelProperty({example: '', description: ''})
  readonly role: string;

  readonly accessToken: string;

}
