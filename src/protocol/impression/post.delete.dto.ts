import {ApiModelProperty} from '@nestjs/swagger';

export class ImpressionPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
