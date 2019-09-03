import {ApiModelProperty} from '@nestjs/swagger';

export class MarschroutePostApproveDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  @ApiModelProperty({example: '', description: ''})
  readonly userId: number;

  readonly accessToken: string;

}
