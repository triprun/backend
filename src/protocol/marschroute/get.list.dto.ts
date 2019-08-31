import {ApiModelProperty} from '@nestjs/swagger';

export class MarschrouteGetListDto {

  @ApiModelProperty()
  readonly userId?: string;

  readonly accessToken: string;

}
