import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostLeaveDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
