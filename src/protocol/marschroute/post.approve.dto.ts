import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostApproveDto {

  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly userId: number;

  readonly accessToken: string;

}
