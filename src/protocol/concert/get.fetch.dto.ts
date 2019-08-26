import {ApiModelProperty} from '@nestjs/swagger';

export class ConcertGetFetchDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
