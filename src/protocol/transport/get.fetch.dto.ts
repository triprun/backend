import {ApiModelProperty} from '@nestjs/swagger';

export class TransportGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
