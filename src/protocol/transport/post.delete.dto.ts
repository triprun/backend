import {ApiModelProperty} from '@nestjs/swagger';

export class TransportPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
