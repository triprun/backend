import {ApiModelProperty} from '@nestjs/swagger';

export class TransportGetFetchDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
