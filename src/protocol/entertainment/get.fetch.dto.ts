import {ApiModelProperty} from '@nestjs/swagger';

export class EntertainmentGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
