import {ApiModelProperty} from '@nestjs/swagger';

export class TemporaryGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
