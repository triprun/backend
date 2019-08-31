import {ApiModelProperty} from '@nestjs/swagger';

export class MarschrouteGetFetchDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
