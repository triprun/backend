import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostDropDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  @ApiModelProperty({example: '', description: ''})
  readonly userId: string;

  readonly accessToken: string;

}
