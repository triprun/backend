import {ApiModelProperty} from '@nestjs/swagger';

export class EntertainmentPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
