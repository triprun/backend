import {ApiModelProperty} from '@nestjs/swagger';

export class SightPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
