import {ApiModelProperty} from '@nestjs/swagger';

export class ConcertPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
