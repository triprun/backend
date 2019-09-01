import {ApiModelProperty} from '@nestjs/swagger';

export class RelaxGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
