import {ApiModelProperty} from '@nestjs/swagger';

export class MarschrouteGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
