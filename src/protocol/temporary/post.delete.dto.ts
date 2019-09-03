import {ApiModelProperty} from '@nestjs/swagger';

export class TemporaryPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
