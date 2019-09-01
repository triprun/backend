import {ApiModelProperty} from '@nestjs/swagger';

export class CustomGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
