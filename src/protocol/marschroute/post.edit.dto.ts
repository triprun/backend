import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostEditDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  @ApiModelProperty({example: '', description: ''})
  name: string;

  @ApiModelProperty({example: '', description: ''})
  description: string;

  readonly accessToken: string;

}
