import {ApiModelProperty} from '@nestjs/swagger';

export class TemporaryGetFetchDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
