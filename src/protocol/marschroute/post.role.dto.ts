import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostJoinDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
