import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostLeaveDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
