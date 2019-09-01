import {ApiModelProperty} from '@nestjs/swagger';

export class PhotoGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
