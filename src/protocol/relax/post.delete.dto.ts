import {ApiModelProperty} from '@nestjs/swagger';

export class RelaxPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
