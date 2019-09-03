import {ApiModelProperty} from '@nestjs/swagger';

export class MarschrouteGetListDto {

  @ApiModelProperty({example: '', description: ''})
  readonly userId?: string;

  readonly accessToken: string;

}
