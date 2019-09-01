import {ApiModelProperty} from '@nestjs/swagger';

export class ConcertGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
