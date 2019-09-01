import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostJoinDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
