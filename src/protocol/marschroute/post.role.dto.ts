import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostRoleDto {

  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly userId: string;

  @ApiModelProperty()
  readonly role: string;

  readonly accessToken: string;

}
