import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostDropDto {

  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly userId: string;

  readonly accessToken: string;

}
