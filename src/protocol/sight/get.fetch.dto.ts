import {ApiModelProperty} from '@nestjs/swagger';

export class SightGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
